import mongoose, { plugin } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "productos"

const productIndexNeeded = {
    type: String,
    index: true
}


const productSchema = new mongoose.Schema({
    title: productIndexNeeded,
    description: String,
    price: Number,
    stock: Number,
    category: productIndexNeeded,
    status: Boolean
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model('Product', productSchema,productCollection)