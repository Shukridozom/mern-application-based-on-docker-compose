import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { IProduct } from "./productMode";

const CartStatusEnum = ["active", "completed"]

interface ICartItem extends Document {
    product: IProduct,
    unitPrice: number,
    quantity: number
}

interface ICart extends Document {
    userId: ObjectId | string,
    items: ICartItem[],
    totalAmount: number,
    status: "active" | "completed"
}

const cartItemSchema: Schema<ICartItem> = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema: Schema<ICart> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: CartStatusEnum, default: "active" }
});

export const cartModel = mongoose.model<ICart>("Carts", cartSchema);