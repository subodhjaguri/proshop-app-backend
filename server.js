import express from "express";
import products from "./data/products.js";
const app = express();

app.listen(5000, () => {
  console.log("Port is listening ");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});
