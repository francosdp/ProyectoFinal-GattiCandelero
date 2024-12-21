import { readFile } from 'fs';
import fs from 'fs/promises'
import path from 'path'

import mongoose from 'mongoose';

const DBPath = 'mongodb+srv://Franco:fransdp.atlas@cluster0.ei50y.mongodb.net/EntregaFinal?retryWrites=true&w=majority&appName=Cluster0'

async function conectDataBase() {
    try{

    }catch(error){
        
    }
    
} 



const productFilePath = path.resolve('data', 'productos.json')


export default class ProductManager {

    async saveFile() {
        const jsonData = JSON.stringify(this.products, null, 2);
        await fs.writeFile(productFilePath, jsonData)
    }




    constructor() {
        this.products = [];
        this.init()
    }
    async init() {
        try {
            const data = await fs.readFile(productFilePath, 'utf-8');
            this.products = JSON.parse(data);
        }
        catch (error) {
            this.products = [];
        }
    }




    async getAllProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit);
        }
        return this.products;
    }

    async getProductById(id) {
        return this.products.find(product => product.id === id)

    }

    async addProduct(product) {

        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true,
        }
        this.products.push(newProduct)

        this.saveFile()

        return newProduct
    }

    async updateProduct(id, updateInfo) {
        const foundProduct = this.products.findIndex(product => product.id === id)
        if (foundProduct < 0) return null

        const updatedProduct = {
            ...this.products[foundProduct],
            ...updateInfo,
            id: this.products[foundProduct].id,
        }

        this.products[foundProduct] = updatedProduct

        this.saveFile()

        return updatedProduct
    }

    async deteleProduct(id) {
        const productFound = this.products.findIndex(product => product.id === id)
        if (productFound < 0) return null

        const deletedProduct = this.products.splice(productFound, 1)
        this.saveFile()
        return deletedProduct
    }





}