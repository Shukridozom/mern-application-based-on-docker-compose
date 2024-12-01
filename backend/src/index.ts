import express from "express";
import mongoose from "mongoose";

const DATABASE_HOST = "localhost";
const DATABASE_PORT = 27017;
const DATABASE_NAME = "e-commerce";

const app = express();
const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;

mongoose
    .connect(`mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB"));

app.listen(SERVER_PORT, () => {
    console.log(`Server is running at: http://${SERVER_HOST}:${SERVER_PORT}`)
});