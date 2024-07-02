import "./env.js";
import { dbClient, initDbSchema } from "./db.js";
import express from "express";
import { parseJSON } from "./utils/parseJSON.js";

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

app.delete("/provider", async (req, res) => {
  const providerId = Number(req.body);
  if (!providerId) {
    res.status(400).send("Provide provider id");
    return;
  }

  const providers = await dbClient.execute({
    sql: "select id from electricity where id = :providerId",
    args: { providerId },
  });

  if (providers.rows.length === 0) {
    res.status(400).send("There are no providers with this id");
    return;
  }

  await dbClient.execute({
    sql: "delete from electricity where id = :providerId",
    args: { providerId },
  });

  res.status(200).send();
});

app.put("/provider/:id", async (req, res) => {
  const providerId = req.params.id;

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

  dbClient.execute({
    sql: `update electricity
    set name                        = :name,
        country                     = :country,
        market_share                = :market_share,
        renewable_energy_percentage = :renewable_energy_percentage,
        yearly_revenue              = :yearly_revenue
    where id = :id;`,
    args: {
      name,
      country,
      market_share,
      renewable_energy_percentage,
      yearly_revenue,
      id: providerId,
    },
  });

  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`European Electricity Market app listening on port ${PORT}`);
});
