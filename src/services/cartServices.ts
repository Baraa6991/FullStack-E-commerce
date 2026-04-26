import cartModel from "../models/cartModel.js";


interface creatCartForUser {
    userId: string;
}

const creatCartForUser = async ({ userId }: creatCartForUser) => {
    const cart = await cartModel.create({ user: userId ,totalPrice:0});
    await cart.save();
    return cart;
}

interface getActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: getActiveCartForUser) => {
    let cart = await cartModel.findOne({ user: userId, status: "active" });
    if (!cart) {
        cart = await creatCartForUser({ userId });
    }
    return cart;
}