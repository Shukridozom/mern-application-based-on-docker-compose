import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

if (!process.env.MONGO_URI) {
    throw new Error('Environment variable MONGO_URL is not defined');
  }
const database_url = process.env.MONGO_URI;

const app = express();
const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;

mongoose
    .connect(database_url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB"));


app.use(express.json());

app.use('/user', userRoute);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running at: http://${SERVER_HOST}:${SERVER_PORT}`)
});
