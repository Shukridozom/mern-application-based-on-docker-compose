import express from "express";
import { validateJWT } from "../middlewares/validateJWT";
import { addItemToCart, checkout, deleteCart, deleteItemFromCart, getCart, updateItemInCart } from "../services/cartService";
import { ExtendedRequest } from "../types/ExtendedRequest";

const route = express.Router();

route.get('/', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await getCart(userHeader)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    })
});

route.delete('/', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await deleteCart(userHeader)
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
})
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

route.delete('/item/:productId', validateJWT, async(req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    const reqParams = req?.params;
    await deleteItemFromCart(userHeader, reqParams)
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
})

route.post('/checkout', validateJWT, async (req: ExtendedRequest, res) => {
    const userHeader = req?.user;
    await checkout(userHeader, req.body)
    .then((data) => {
        res.status(data.statusCode).send(data.response);
    })
})
export default route;
