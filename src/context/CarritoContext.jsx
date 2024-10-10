import { useState, createContext} from "react"

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
})

export const CarritoProvider = ({children}) => {

    const [carrito, setCarrito] = useState([])
    const [total, setTotal] = useState(0)
    const [cantidadTotal, setCantidadTotal] = useState(0)
 
    console.log(carrito)

    const agregarAlCarrito = (producto, cantidad) => {
        const productoEnStock = carrito.find(prod => prod.producto.id === producto.id)
        if (!productoEnStock) {
            setCarrito(prev => [...prev, { producto, cantidad }])
            setCantidadTotal(prev => prev + cantidad)
            setTotal(prev => prev + (producto.precio * cantidad))
        } else {
            const carritoActualizado = carrito.map(prod => {
                if (prod.producto.id === producto.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad }
                } else {
                    return prod
                }
            })
            setCarrito(carritoActualizado)
            setCantidadTotal(prev => prev + cantidad)
            setTotal(prev => prev + (producto.precio * cantidad))
        }
    }
    const eliminarProducto = (id) => {
        const productoEliminado = carrito.find(prod => prod.producto.id === id)
        const carritoActualizado = carrito.filter(prod => prod.producto.id !== id)

        setCarrito(carritoActualizado)
        setCantidadTotal(prev => prev - productoEliminado.cantidad)
        setTotal(prev => prev - (productoEliminado.prodcut.precio * productoEliminado.cantidad))
    }

    const vaciarCarrito = () => {
        setCarrito([])
        setCantidadTotal(0)
        setTotal(0)
    }







    return (
        <CarritoContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito, eliminarProducto, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>

    )


}