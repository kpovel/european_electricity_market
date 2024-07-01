import assert from "node:assert";

const DATABASE_URL = process.env.DATABASE_URL;
assert(typeof DATABASE_URL === "string");

export const env = {
  DATABASE_URL,
};
