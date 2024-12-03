import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { getActiveCart } from "../services/cartService";

const route = express.Router();

route.get('/', validateJWT, async (req, res) => {
    const cart = await getActiveCart(req)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
});

export default route;
