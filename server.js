import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const app = express();

dotenv.config();

connectDB();

app.listen(5000, () => {
  console.log("Port is listening ");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);
