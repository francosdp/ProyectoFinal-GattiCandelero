import express from 'express'
import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import ProductManager from './services/ProductManager.js'

import mongoose from 'mongoose'


const app = express();
const PORT = 8080


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const DBPath = 'mongodb+srv://Franco:fransdp.atlas@cluster0.ei50y.mongodb.net/EntregaFinal?retryWrites=true&w=majority&appName=Cluster0'

const connetcMongoDB = async () => {
    try {
        await mongoose.connect(DBPath)
        console.log("Conectado a MongoDB")
    } catch (error) {
        console.log("Error al conectar")
    }
}
connetcMongoDB()



const httpServer = app.listen(PORT, () => { console.log('Servidor socket.io corriendo en ' + PORT) });
const socketServer = new Server(httpServer)


const productManager = new ProductManager()

socketServer.on('connection', socket => {
    console.log("Nuevo Cliente conectado en Socket.Io")

    socket.on("mensaje2", data => {
        console.log("Recibido", data)
    })
    socket.on("formulario", data => {
        if (!data.title || !data.description || !data.code || !data.price || !data.stock || !data.category) {
            socket.emit('error', { error: "Todos los campos son obligatorios" });
            return;
        }
        productManager.addProduct(data)
            .then(() => {
                socket.emit(`success`, { message: "Producto Agregado Correctamente" })
                let products = productManager.products
                socket.emit('productos', products)
            })
            .catch(error => {
                socket.emit('error', { error: "Error al agregar producto" })
            })
    })
    socket.on('eliminar', (data) => {
        if (!data) {
            socket.emit('error', { error: "El campo es obligatorio " });
            return;
        }
        let products = productManager.products

        const productFound = products.findIndex(product => product.id === data)
        console.log(productFound)
        if (productFound<0) {
            socket.emit('notDeleted', { error: "Producto no encontrado" })
        } else {
            const deletedProduct = products.splice(productFound,1)
            socket.emit('deleted', { message: "El producto se ha eliminado" })
            productManager.saveFile()
            products = productManager.products
            socket.emit('productos', products)
        }





    })


})








app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))




app.use('/', viewsRouter)
app.use('/products', productRouter)
app.use('/carts', cartRouter)







