import mongoose, { Schema, ObjectId, Document } from "mongoose";
import { Iproduct } from "./productModel.js";

const cartStatusEnum = ["active", "completed"]

export interface IcartItem extends Document {
    product: Iproduct;
    unitPrice: number;
    quantity: number;
}

export interface Icart extends Document {
    user: ObjectId | string;
    items: IcartItem[];
    totalPrice: number;
    status: "active" | "completed";
}

const cartItemSchema = new Schema<IcartItem>({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new Schema<Icart>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, },
    status: { type: String, enum: cartStatusEnum, default: "active" }
});
export const cart = mongoose.model<Icart>("Cart", cartSchema);

export default cart;