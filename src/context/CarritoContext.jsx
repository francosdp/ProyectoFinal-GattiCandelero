import { useState, createContext } from "react"
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
})
export const CarritoProvider = ({ children }) => {

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
        setTotal(prev => prev - (productoEliminado.producto.precio * productoEliminado.cantidad))
        toast.warn('Producto eliminado con éxito', { autoClose: 2000, theme: "colored", position: "bottom-right" })
    }



    const vaciarCarrito = () => {
        Swal.fire({
            title: "¿Deseas elminiar todos los productos?",
            text: "Se eliminarán todos los productos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar."
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Eliminado!",
                    text: "Tu carrio ha sido vaciado",
                    icon: "success"
                });
                setCarrito([])
                setCantidadTotal(0)
                setTotal(0)
            }
        });
    }
    const compraFinalizada = () => {
        setCarrito([])
        setCantidadTotal(0)
        setTotal(0)
    }


    const sumarProducto = (id) => {
        const productoEnStock = carrito.find(prod => prod.producto.id === id);
        if (productoEnStock) {
            const carritoActualizado = carrito.map(prod => {
                if (prod.producto.id === id) {
                    return { ...prod, cantidad: prod.cantidad + 1 };
                } else {
                    return prod;
                }
            });
            setCarrito(carritoActualizado);
            setCantidadTotal(prev => prev + 1);
            setTotal(prev => prev + productoEnStock.producto.precio);
        }
    };
    const restarProducto = (id) => {
        const productoEnStock = carrito.find(prod => prod.producto.id === id);
        if (productoEnStock) {
            if (productoEnStock.cantidad > 1) {
                const carritoActualizado = carrito.map(prod => {
                    if (prod.producto.id === id) {
                        return { ...prod, cantidad: prod.cantidad - 1 };
                    } else {
                        return prod;
                    }
                });
                setCarrito(carritoActualizado);
                setCantidadTotal(prev => prev - 1);
                setTotal(prev => prev - productoEnStock.producto.precio);
            }
        }
    }
        ;

    return (
        <CarritoContext.Provider value={{ carrito, total, cantidadTotal, agregarAlCarrito, eliminarProducto, vaciarCarrito, compraFinalizada, sumarProducto, restarProducto }}>
            {children}
        </CarritoContext.Provider>
    );
}