import { createClient } from "@libsql/client";
import { env } from "./env.js";

export const dbClient = createClient({
  url: env.DATABASE_URL,
});

export function initDbSchema() {
  dbClient.execute(`
create table if not exists electricity (
    id                          integer primary key autoincrement,
    name                        text not null,
    country                     text not null,
    market_share                real not null,
    renewable_energy_percentage real not null,
    yearly_revenue              int  not null
) strict;
`);
}
