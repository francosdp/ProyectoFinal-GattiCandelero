import { useState } from "react"
import { useEffect } from "react"
import { getProducts } from "../../asyncmock"
import ItemList from "../ItemList/ItemList"
import { getProductsCategory } from "../../asyncmock"
import { useParams } from "react-router-dom"


const ItemListContainer = () => {
    const [productos, setProductos] = useState([])

    const { idCategoria } = useParams()

    useEffect(() => {
        const funcionProductos = idCategoria ? getProductsCategory : getProducts
        funcionProductos(idCategoria)
            .then(respuesta => setProductos(respuesta))
    }, [idCategoria])




    return (
        <>
            <h2 style={{ textAling: "center", color: "red" }}>Productos</h2>
            <ItemList productos={productos}/>
        </>
    )
}

export default ItemListContainer