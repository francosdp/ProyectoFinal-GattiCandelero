import { Router } from 'express'
import { productModel } from '../models/product.Model.js'
import ProductManager from '../services/ProductManager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        let limit = parseInt(req.query.limit)
        let page = parseInt(req.query.page)

        let { category, order, stock } = req.query
        let filter = {}
        if (category) { filter.category = { $regex: category, $options: 'i' } }
        if (stock) { filter.stock = parseInt(stock) }



        let products = await productManager.getAllProducts(limit, page, filter, order)


        let handleProds = products.docs


        
        handleProds.prevLink = products.hasPrevPage ? `http://localhost:8080/?page=${products.prevPage}` : null;
        handleProds.nextLink = products.hasNextPage ? `http://localhost:8080/?page=${products.nextPage}` : null;





        handleProds.isValid = !(page <= 0 || page > products.totalPages)

        console.log(handleProds)
        res.render('home', { handleProds })


    } catch (error) {
        console.log(error + " No se pudo realizar la operacion solicitada")
    }
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