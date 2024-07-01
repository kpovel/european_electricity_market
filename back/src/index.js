import "./env.js";
import { dbClient, initDbSchema } from "./db.js";
import express from "express";

initDbSchema();

export const PORT = 42069;
export const app = express();

app.get("/provider", async (_req, res) => {
  const result = await dbClient.execute(`
select id, name, country, market_share, renewable_energy_percentage, yearly_revenue
from electricity;`);
  const rows = result.rows;
  res.send(rows);
});

app.listen(PORT, () => {
  console.log(`European Electricity Market app listening on port ${PORT}`);
});
