import express from "express";
import dotenv from "dotenv"; // env config's
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// middleware Log
app.use((req, res, next) => {
  console.log(`${req.url} - ${req.method} at ${req.requestTime}`);
  next();
});



app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
