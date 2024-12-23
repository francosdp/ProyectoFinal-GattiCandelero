import { cartModel } from "../models/cart.Model.js"
import { productModel } from "../models/product.Model.js"

export default class CartManager {



    constructor() {
        this.carts = []
    }

    async getAllCarts() {
        this.carts = await cartModel.find()
        return this.carts
    }



    async addCart() {
        const newCart = await cartModel.create({
            products: []
        })
        return newCart
    }

    async findCart(id) {
        const foundCart = await cartModel.find({ _id: id })
        if (!foundCart) {
            return null
        }
        return foundCart
    }

    async addProduct(cartId, productId, amount) {
        try {
            const findProduct = await productModel.findOne({ _id: productId })
            if (!findProduct) {
                return console.log("Error: El id no corresponde a un producto disponible")
            }

            const addProduct = {
                product: {
                    _id: findProduct._id,
                    title: findProduct.title,
                    price: findProduct.price,
                    quantity: amount
                }
            }
            console.log(addProduct._id)

            if (amount > addProduct.stock) {
                return console.log("Error: No hay suficientes unidades disponibles");
            }


            const foundCart = await cartModel.findOne({ _id: cartId })
            if (!foundCart) {
                return console.log("Error: El id no corresponde a un carrito existente")
            }

            const existingProductIndex = foundCart.products.findIndex(item => item.product.title === addProduct.product.title);

            if (existingProductIndex !== -1) {

                foundCart.products[existingProductIndex].product.quantity += amount;
            } else {
                foundCart.products.push(addProduct);
            }
            await foundCart.save()
            return foundCart

        } catch (error) {
            console.error(error.message || error);
            throw error;
        }
    }

    async deleteProduct(cartId, productId) {

        try {

            const foundCart = await cartModel.findOne({ _id: cartId })
            if (!foundCart) {
                return console.log("Error: El id no corresponde a un carrito existente")
            }
            const foundProduct = await productModel.findOne({ _id: productId })
            if (!foundProduct) {
                return console.log("Error: El id no corresponde a un producto disponible")
            }

            const existingProduct = foundCart.products.findIndex(item => item.product._id.toString() === productId);

            if (existingProduct !== 1) {
                foundCart.products.splice(existingProduct, 1);
                foundCart.save()

            } else {
                console.log("No se pudo eliminar el producto")
            }

            return foundCart

        } catch (error) {
            console.log(error)
        }
    }


    async deleteAllCart(cartId) {
        try {
            let foundCart = await cartModel.findOne({ _id: cartId })
            if (!foundCart) {
                return console.log("Error: El id no corresponde a un carrito existente")
            } else {
                foundCart.products=[]
            }
            await foundCart.save()
            return foundCart
        } catch (error) {
            console.log(error + " No se pudo eliminar el carrito ")
        }
    }





}


