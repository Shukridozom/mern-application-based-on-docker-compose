import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IOrderItem {
    productTitle: string,
    productImage: string,
    unitePrice: number,
    quantity: number
}

interface IOrder extends Document {
    orderItems: IOrderItem[],
    total: number,
    address: string,
    userId: ObjectId,

}

const OrderItemSchema = new Schema<IOrderItem>({
    productTitle: {type:String, required: true},
    productImage: {type:String, required: true},
    unitePrice: {type:Number, required: true},
    quantity: {type:Number, required: true}
})

const orderSchema = new Schema<IOrder>({
    orderItems: [OrderItemSchema],
    total: {type: Number, required: true},
    address: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: "Users", required: true}
});

export const orderModel = mongoose.model<IOrder>("Orders", orderSchema);
