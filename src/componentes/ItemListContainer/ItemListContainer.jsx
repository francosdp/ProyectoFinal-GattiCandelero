import { useState } from "react"
import { useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../service/config'




const ItemListContainer = () => {
    const [productos, setProductos] = useState([])

    const { idCategoria } = useParams()


    useEffect(() => {
        const misProductos = idCategoria ? query(collection(db, "gigastock"), where("categoria", "==", idCategoria)) : (collection(db, "gigastock"))
        getDocs(misProductos)
            .then(respuesta => {
                const nuevosProductos = respuesta.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
                })
                setProductos(nuevosProductos)
            })
            .catch()
            .finally()
    }, [idCategoria])



    return (
        <>
            <ItemList productos={productos} />
        </>
    )
}

export default ItemListContainer





