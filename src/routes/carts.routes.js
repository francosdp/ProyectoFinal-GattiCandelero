import { Router } from "express";
import CartManager from "../services/CartManager.js"
import { cartModel } from "../models/cart.Model.js";



const router = Router()
const cartManager = new CartManager()





router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts()
        res.json(carts)
    } catch (error) {
        console.log(error + " No pudo realizarse la busqueda")
    }
})

router.post('/', async (req, res) => {
    try {
        const carts = await cartManager.getAllCarts()
        const newCart = await cartManager.addCart()

        res.status(201).json({
            carts: carts
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cartId = (req.params.cid)
        let cart = await cartManager.getCartForViews(cartId)
        
        res.render('carts', {cart})
    } catch (error) {
        console.log(error)
    }


})








router.post('/:cid/product/:pid', async (req, res) => {

    try {


        const cartId = (req.params.cid)
        const productId = (req.params.pid)
        const quantity = parseInt(req.body.quantity)


        const selectedCart = await cartManager.addProduct(cartId, productId, quantity)


        res.send(selectedCart)

    } catch (error) {
        console.log(error)
        res.status(404).json("Alguno de los datos proporcionados fue incorrecto, prueba nuevamente.")
    }


})

router.delete('/:cid/product/:pid', async (req, res) => {
    try {

        const cartId = (req.params.cid)
        const productId = (req.params.pid)

        const deleteProduct = await cartManager.deleteProduct(cartId, productId)
        res.send(deleteProduct)


    } catch (error) {
        console.log(error)
    }


})

router.delete('/:cid', async (req, res) => {
    try {

        const cartId = (req.params.cid)
        const deleteCart = await cartManager.deleteAllCart(cartId)
        res.send(deleteCart)

    } catch (error) {
        console.log(error)
    }


})





export default router;