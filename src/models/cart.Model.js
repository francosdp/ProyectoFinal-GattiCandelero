import mongoose from "mongoose";

const cartsCollection = "cart"

const productsSchema = new mongoose.Schema({
    product: {
        _id:mongoose.Schema.Types.ObjectId,
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }
});
const cartSchema = new mongoose.Schema({
    products: [productsSchema]
});



export const cartModel = mongoose.model(cartsCollection, cartSchema)