import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
    title: string,
    image: string,
    price: number,
    stock: number
}

const productSchema: Schema<IProduct> = new Schema({
    title: {type: String, required: true},
    image: { type: String, required: true},
    price: { type: Number, required: true},
    stock: {type: Number, required: true, default: 0},
});

export const productModel = mongoose.model<IProduct>("Products", productSchema);