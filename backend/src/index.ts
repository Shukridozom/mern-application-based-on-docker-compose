import dotenv from "dotenv"
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
    .connect(process?.env?.DATABASE_URL || "")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB"));

seedInitialProducts();

app.use('/user', userRoute);

app.use('/product', productRoute);

app.use('/cart', cartRoute);

app.listen(parseInt(process?.env?.SERVER_PORT || ''), () => {
    console.log(`Server is running at: http://${process?.env?.SERVER_IP || ''}:${process?.env?.SERVER_PORT || ''}`)
});
