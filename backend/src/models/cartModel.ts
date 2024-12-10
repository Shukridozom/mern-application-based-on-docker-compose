import mongoose, { Document, ObjectId, Schema } from "mongoose";

const CartStatusEnum = ["active", "completed"]

export interface ICartItem {
    productId: ObjectId,
    unitPrice: number,
    quantity: number
}

interface ICart extends Document {
    userId: ObjectId,
    items: ICartItem[],
    totalPrice: number,
    status: "active" | "completed"
}

const cartItemSchema: Schema<ICartItem> = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema: Schema<ICart> = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 },
    status: { type: String, enum: CartStatusEnum, default: "active" }
});

export const cartModel = mongoose.model<ICart>("Carts", cartSchema);