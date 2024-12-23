import { productModel } from '../models/product.Model.js';







export default class ProductManager {

    constructor() {
        this.products = []
    }





    async getAllProducts(limit, page, filter, order) {
        let sort = {}
        if (order === '1' || order === '-1') {
            sort = { price: parseInt(order) };
        } else if (order === '') {
            sort = {}
        }
        
        if (filter) {
            let products = await productModel.paginate(filter, { limit: limit, page: page, sort: sort,lean:true })
            if (products.docs.length<1){
                return
            }else{
                return products 
            }
        } else {
            let products = await productModel.paginate({}, { limit: limit, page: page, sort: sort, lean:true})
            return products
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