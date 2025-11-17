import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(`${req.ip} to /index.js`);
  res.redirect("/index.html");
});

app.listen(PORT);
export default app;
