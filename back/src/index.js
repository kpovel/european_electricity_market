import "./env.js";
import { dbClient, initDbSchema } from "./db.js";
import express from "express";

initDbSchema();

export const PORT = 42069;
export const app = express();
app.use(express.raw({ type: "*/*" }));

app.get("/provider", async (_req, res) => {
  const result = await dbClient.execute(`
select id, name, country, market_share, renewable_energy_percentage, yearly_revenue
from electricity;`);
  const rows = result.rows;
  res.send(rows);
});

app.post("/provider", async (req, res) => {
  const body = req.body;
  if (!body) {
    res
      .status(415)
      .send(
        "Provide name, country, market_share, renewable_energy_percentage and yearly_revenue in a json format",
      );
    return;
  }

  const json = parseJSON(body);

  if (json.err !== null) {
    res.status(400).send("Can't parse json");
    return;
  }

  const {
    name,
    country,
    market_share,
    renewable_energy_percentage,
    yearly_revenue,
  } = json.ok;

  if (
    typeof name !== "string" ||
    typeof country !== "string" ||
    typeof market_share !== "number" ||
    typeof renewable_energy_percentage !== "number" ||
    typeof yearly_revenue !== "number"
  ) {
    res.status(400).send("Invalid data format");
    return;
  }

  const provider = await dbClient.execute({
    sql: "select id from electricity where name = :name",
    args: { name },
  });

  if (provider.rows.length) {
    res.status(409).send("Provider with this name already exists");
    return;
  }

  dbClient.execute({
    sql: `insert into electricity (name, country, market_share, renewable_energy_percentage, yearly_revenue)
values (:name, :country, :market_share, :renewable_energy_percentage, :yearly_revenue);`,
    args: {
      name,
      country,
      market_share,
      renewable_energy_percentage,
      yearly_revenue,
    },
  });
  res.send(201).send();
  return;
});

/**
 * @param {string} json
 * @returns {Result<any, string>}
 */
export function parseJSON(json) {
  try {
    return { ok: JSON.parse(json), err: null };
  } catch (e) {
    return { ok: null, err: "can't parse json" };
  }
}

app.listen(PORT, () => {
  console.log(`European Electricity Market app listening on port ${PORT}`);
});
