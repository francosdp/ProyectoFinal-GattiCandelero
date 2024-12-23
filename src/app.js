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



app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})








app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.static(__dirname + '/public'))




app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)







