import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";


interface creatCartForUser {
    userId: string;
}

const creatCartForUser = async ({ userId }: creatCartForUser) => {
    const cart = await cartModel.create({ user: userId, totalPrice: 0 });
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

interface AddItemsToCart {
    productId: any;
    quantity: number;
    userId: string;
}
export const addItemToCart = async ({ productId, quantity, userId }: AddItemsToCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existsInCart = await cart.items.find((p) => p.product.toString() === productId);
    if (existsInCart) {
        return { data: "Item already exists in cart", statusCode: 400 };

    }
    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "Product not found", statusCode: 400 };
    }
    if (product.stock < quantity) {
        return { data: "Low Stock for item", statusCode: 400 };
    }
    await cart.items.push({ product: productId, unitPrice: product.price, quantity });
    cart.totalPrice += product.price * quantity;
    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
}