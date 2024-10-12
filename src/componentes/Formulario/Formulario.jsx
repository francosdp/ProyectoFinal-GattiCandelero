import { useState } from 'react'
import { db } from '../../service/config'
import { collection, addDoc } from "firebase/firestore"


const Formulario = () => {



    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const manejadorFormulario = (e) => {
        e.preventDefault()

        addDoc(collection(db, "nuevoCliente"), {
            nombre: nombre,
            apellido: apellido,
            email: email,
        });
        setNombre("")
        setApellido("")
        setEmail("")
    }


    return (
        <form onSubmit={manejadorFormulario}>
            <label htmlFor=''>Nombre</label>
            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
            <br />
            <label htmlFor=''>Apellido</label>
            <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
            <br />
            <label htmlFor=''>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <button type='submit'>Enviar Datos</button>
        </form>
    )
}

export default Formulario