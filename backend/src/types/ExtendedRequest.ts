import { Request } from "express";
import { IUser } from "../models/userModel";

export interface ExtendedRequest extends Request {
    user?: IUser;
}

export const getUserIdFromExtendedRequest = (req: ExtendedRequest): string | undefined => {
    const userId = req?.user?._id;
    if(!userId)
        return undefined;

    
}