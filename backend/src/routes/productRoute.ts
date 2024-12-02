import express from "express";
import { getProducts } from "../services/productService";

const route = express.Router();

route.get('/', async (req, res) => {
    await getProducts()
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
});

export default route;
