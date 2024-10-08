import { useState, useEffect } from "react"
import { callProduct } from "../../asyncmock"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"


const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null)

    const {idItem} =useParams()


    useEffect(() => {
        callProduct(idItem)
            .then(respuesta => setProducto(respuesta))
    }, [])



    return (
        <div>
<ItemDetail {...producto}/>
        </div>
    )
}

export default ItemDetailContainer