import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import ProductManager from '../services/ProductManager.js'
import { productModel } from '../models/product.Model.js'

let products = []

async function productsInDB() {
    productsInDB = await productModel.find()
    products = productsInDB.map(product=> product.toObject())
    return products
}
productsInDB()


const router = express.Router()
const productManager = new ProductManager()


router.get('/', async (req, res) => {
    res.render('home', { products })
})




router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { products })
})





router.post('/realtimeproducts', async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const newProduct = await productManager.addProduct({ title, description, code, price, stock, category })

        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
})

export default router