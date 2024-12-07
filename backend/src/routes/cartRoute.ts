import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { addItemToCart, getCart, updateItemInCart } from "../services/cartService";

const route = express.Router();

route.get('/', validateJWT, async (req, res) => {
    await getCart(req)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
});

route.post('/item', validateJWT, async (req, res) => {
    await addItemToCart(req)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
})

route.put('/item', validateJWT, async (req, res) => {
    await updateItemInCart(req)
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
})

export default route;
