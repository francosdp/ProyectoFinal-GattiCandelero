import './ItemDetail.css';
import ItemCount from "../ItemCount/ItemCount";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../../context/carritoContext';
import { useContext } from 'react';

const ItemDetail = ({ id, nombre, precio, img, details,stock }) => {

    const [agregarCantidad, setAgregarCantidad] = useState(0)
    const {agregarAlCarrito} = useContext(CarritoContext)

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad)

        const item = {id, nombre, precio}
        agregarAlCarrito(item,cantidad)
    }






    return (
        <div className='productContainer'>
            <div className='productImg'>
                <img src={img} alt={nombre} />
            </div>
            <div className='productInfoContainer'>
                <h2>{nombre}</h2>
                <p>Precio: ${precio}</p>
                <p>ID: {id}</p>
                <p>{details}</p>
                {
                    agregarCantidad > 0 ? (<Link to="/cart">Terminar Compra</Link>) : (<ItemCount inicial={1} stock={stock} agregarCompra={manejadorCantidad}/>)
                }



            </div>
        </div>
    )
}

export default ItemDetail