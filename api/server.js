import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../public");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});



app.use(express.static(publicPath));

app.listen(PORT);
export default app;
