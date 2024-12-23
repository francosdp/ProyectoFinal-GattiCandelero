import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const cartsCollection = "cart"

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
});

cartSchema.plugin(mongoosePaginate);

export const cartModel = mongoose.model(cartsCollection, cartSchema)