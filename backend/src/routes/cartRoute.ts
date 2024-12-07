import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { addItemToCart, getCart, updateItemInCart } from "../services/cartService";
import { ExtendedRequest } from "../types/ExtendedRequest";

const route = express.Router();

route.get('/', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await getCart(userHeader)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
});

route.post('/item', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await addItemToCart(userHeader, req.body)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
})

route.put('/item', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await updateItemInCart(userHeader, req.body)
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
})

export default route;
