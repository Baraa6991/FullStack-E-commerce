import mongoose, { Schema, ObjectId, Document } from "mongoose";

export interface IorderItem {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
}

export interface Iorder extends Document {
    orderItems: IorderItem[];
    total: number;
    address: string;
    userId: string | ObjectId;
}

const OrderItemSchema = new Schema<IorderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new Schema<Iorder>({
    orderItems: [OrderItemSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export const orderModel = mongoose.model<Iorder>("Order", orderSchema);