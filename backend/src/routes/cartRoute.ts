import express from "express";
import { validateJWT } from "../middlewares/validateJWT";

const route = express.Router();

route.get('/', validateJWT, async (req, res) => {
    res.status(200).send();
});

export default route;
