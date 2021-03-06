import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { paymentController } from "./controllers/paymentController.js";
const app = express();

dotenv.config();

connectDB();

app.use(express.json());
app.listen(5000, () => {
  console.log("Port is listening ");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

app.post("/payment", paymentController);

app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
