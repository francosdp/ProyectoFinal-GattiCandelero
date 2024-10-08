import './ItemDetail.css';


const ItemDetail = ({ id, nombre, precio, img }) => {
    return (
        <div className='productContainer'>
            <h2>Nombre: {nombre}</h2>
            <p>Precio: {precio}</p>
            <p>ID: {id}</p>
            <img src={img} alt= {nombre} />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse inventore harum molestias molestiae, consectetur corrupti vitae fuga ut assumenda unde veniam a obcaecati similique nostrum error itaque incidunt eveniet? Est?</p>
        </div>
    )
}

export default ItemDetail