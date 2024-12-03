import { Request, Response, NextFunction } from "express";
import { IUser, userModel } from "../models/userModel";
import jwt from 'jsonwebtoken'

interface ExtendedRequest extends Request {
    user?: IUser;
}

export const validateJWT = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const secretKey = '0a4f80a1e181f6345c783d66174da7980d43caadb5828b5637cd428bca47c4d4';
        const authHeader = req.get('authorization');
        if (!authHeader) {
            res.status(401).send();
            return;
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).send();
            return;
        }

        jwt.verify(token, secretKey, async (error, payload) => {
            if (error) {
                res.status(401).send();
                return;
            }

            if (!payload) {
                res.status(401).send();
                return;
            }

            const userCredentials = payload as {
                email: string,
                firstName: string,
                lastName: string
            }

            const user = await userModel.findOne({ email: userCredentials?.email })
            if (!user) {
                res.status(401).send();
                return;
            }
            req.user = user;

            next();
        })

    } catch (error: any) {
        res.status(500).send();
        return;
    }
}
