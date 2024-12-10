import express from "express";
import { loginService, registerService } from "../services/userServices";

const route = express.Router();

route.post("/register", async (req, res) => {
    await registerService(req.body)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    });
});

route.post("/login", async (req, res) => {
    await loginService(req.body)
    .then((data) => {
        res.status(data.statusCode).send(data.response)
    });
});

export default route;
