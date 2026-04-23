import express from 'express';
import { getAllProducts } from '../services/productServices.js';

const routes = express.Router();

// Define your product routes here 
routes.get("/", async(req, res) => {
    const products = await getAllProducts();
    res.status(200).send(products);
});
export default routes;