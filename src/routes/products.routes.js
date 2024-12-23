import { Router } from "express";
import ProductManager from "../services/ProductManager.js";



const router = Router()
const productManager = new ProductManager()






router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const page = req.query.page ? req.query.page : 1


        const { category, price, title, order } = req.query
        let filter = {}
        if (category) { filter.category = category; }
        if (price) { filter.price = { $lte: parseFloat(price) }; }
        if (title) { filter.title = { $regex: title, $options: 'i' } }
        const products = await productManager.getAllProducts(limit, page, filter, order)


        const handleProds = products.docs
        handleProds.isValid = !(page <= 0 || page > products.totalPages)


        res.render('index', { handleProds })
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body
        if (!title || !description || !price || !stock || !category) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" })
        }
        const newProduct = await productManager.addProduct({ title, description, price, stock, category })

        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
})


router.get('/:pid', async (req, res) => {
    try {
        const productId = (req.params.pid);
        console.log(productId)
        const product = await productManager.getProductById(productId);
        
        if (product.length===0) {
            return res.status(404).send("Producto no encontrado")
        }
        res.render('productInfo', {product});
    } catch (error) {
        console.log(error)
    }
});


router.put('/:pid', async (req, res) => {
    try {
        const productId = (req.params.pid);
        if (!productId) {
            res.status(400).json({ message: "Es obligatorio enviar el id por la url" })
        }
        const { title, description, price, stock, category } = req.body


        let updateInfo = {}

        if (title) { updateInfo.title = title }
        if (description) { updateInfo.description = description }
        if (price) { updateInfo.price = parseInt(price) }
        if (stock) { updateInfo.stock = parseInt(stock) }
        if (category) { updateInfo.category = category }


        if (Object.keys(updateInfo).length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar (title, description, price, stock, category).' });
        }


        const productUpdated = await productManager.updateProduct(productId, updateInfo);
        if (productUpdated) {
            res.json(productUpdated)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.log(error)
    }

})

router.delete('/:pid', async (req, res) => {
    try {
        const productId = (req.params.pid);
        const deletedProduct = await productManager.deteleProduct(productId)
        if (deletedProduct) {
            res.json(deletedProduct)
        } else {
            res.status(404).json({ error: 'Producto no encontrado' })
        }
    } catch (error) {
        console.log(error)
    }

})

export default router;