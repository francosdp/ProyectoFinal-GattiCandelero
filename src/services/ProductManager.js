import { productModel } from '../models/product.Model.js';







export default class ProductManager {

    constructor() {
        this.products = []
    }





    async getAllProducts(limit) {
        if (limit) {
            this.products = await productModel.find().limit(limit)
            return this.products
        } else {
            this.products = await productModel.find()
            return this.products
        }
    }

    async getProductById(id) {

        const productById = await productModel.find({ _id: id })
        return productById

    }

    async addProduct(product) {

        const newProduct = await productModel.create({
            title: product.title,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            status: true
        })



        return newProduct
    }

    async updateProduct(id, updateInfo) {
        const updateProduct = await productModel.updateOne({ _id: id }, { $set: updateInfo })

        return updateProduct
    }

    async deteleProduct(id) {
        const productFound = await productModel.deleteOne({ _id: id })
        if (productFound < 0) return null
        return productFound
    }





}