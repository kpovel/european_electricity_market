/**
 * @param {string}  foo - A string param.
 * @returns {string} This is the result
 */

import express from "express";
const app = express();
const PORT = 42069;

app.get("/", (_req, res) => {
  res.send("Hello World!");
  console.log("testies");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
