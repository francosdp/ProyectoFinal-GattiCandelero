import { Router } from 'express'
import { productModel } from '../models/product.Model.js'
import ProductManager from '../services/ProductManager.js'
import { paginate } from 'mongoose-paginate-v2'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    try {
        let limite = parseInt(req.query.limit)
        let pagina = parseInt(req.query.page)

        let { category, order, stock } = req.query
        let filter = {}
        if (category) { filter.category = { $regex: category, $options: 'i' } }
        if (stock) { filter.stock = parseInt(stock) }



        let products = await productManager.getAllProducts(limite, pagina, filter, order)

        const { payload, totalPages, hasPrevPage,page, hasNextPage, prevPage, nextPage } = products


        const paginateInfo = {status:String,payload,totalPages,prevPage, nextPage, page, hasPrevPage, hasNextPage}

        if(!products.docs){
            paginateInfo.status="error"
        }else{
            paginateInfo.status="success"
        }

        paginateInfo.payload=products.docs


        paginateInfo.prevLink = paginateInfo.hasPrevPage ? `http://localhost:8080/?page=${paginateInfo.prevPage}` : null;
        paginateInfo.nextLink = paginateInfo.hasNextPage ? `http://localhost:8080/?page=${paginateInfo.nextPage}` : null;


        console.log(paginateInfo)

        let handleProds = products.docs





        handleProds.isValid = !(page <= 0 || page > products.totalPages)

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