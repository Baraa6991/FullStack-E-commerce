import { get } from "node:http";
import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedProducts = async () => {
    const products = [
        {
            title: "Product 1",
            image: "https://via.placeholder.com/150",
            price: 10,
            stock: 100
        },
    ];

    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
        await productModel.insertMany(products);
    }
}