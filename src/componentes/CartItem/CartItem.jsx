import { useContext } from "react"
import { CarritoContext } from "../../context/carritoContext"


const CartItem = ({ producto, cantidad }) => {

    const { eliminarProducto, sumarProducto, restarProducto } = useContext(CarritoContext)



    return (
        <>

            <h4>{producto.nombre}</h4>
            <p>Cantidad: {cantidad}</p>
            <button onClick={()=>sumarProducto(producto.id)}>+</button>
            <button onClick={()=>restarProducto(producto.id)}>-</button>
            <p>Precio: {producto.precio}</p>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
        </>
    )
}

export default CartItem