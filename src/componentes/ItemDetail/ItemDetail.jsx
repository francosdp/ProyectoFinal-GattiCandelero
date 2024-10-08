import './ItemDetail.css';


const ItemDetail = ({ id, nombre, precio, img, details }) => {
    return (
        <div className='productContainer'>
            <div className='productImg'>
            <img src={img} alt= {nombre} />
            </div>
            <div className='productInfoContainer'>
            <h2>{nombre}</h2>
            <p>Precio: ${precio}</p>
            <p>ID: {id}</p>
            <p>{details}</p>
            </div>
        </div>
    )
}

export default ItemDetail