import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import { seedProducts } from './services/productServices.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const port = 5098;
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
app.get("/", (req, res) => {
    res.send("API working");
});

seedProducts();
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});