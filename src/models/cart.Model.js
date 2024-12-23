import mongoose from "mongoose";
import { productModel } from "./product.Model.js";

const cartsCollection = "cart"

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
});



export const cartModel = mongoose.model(cartsCollection, cartSchema)