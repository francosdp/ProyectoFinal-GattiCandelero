
import { useState } from 'react'

const Contador = ({inicial, stock, agregarCompra}) => {

    const [contador, setContador] = useState(inicial)

    const sumarContador = () => {
        if (contador < stock) {
            setContador(contador + 1)
        }
    }
    const restarContador = () => {
        if (contador > inicial) {
            setContador(contador -1)  
        }
    }







    return (
        <>
            <div>
                <button onClick={sumarContador}>+</button>
                <strong>{contador}</strong>
                <button onClick={restarContador}>-</button>
            </div>
            <button onClick={()=>agregarCompra(contador)}>Agregar al Carrito</button>


        </>
    )
}

export default Contador