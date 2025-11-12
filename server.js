import express from "express";
import dotenv from "dotenv";
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.send("Hello Dotum!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
