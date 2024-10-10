import { useState } from 'react'

const Formulario = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const manejadorFormulario = (e) => {
        e.preventDefault()
        const nuevoCliente = { nombre, apellido, email }
        setNombre("")
        setApellido("")
        setEmail("")
        console.log(nuevoCliente)
    }


    return (
        <form onSubmit={manejadorFormulario}>
            <label htmlFor=''>Nombre</label>
            <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
            <br />
            <label htmlFor=''>Apellido</label>
            <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
            <br />
            <label htmlFor=''>Emaiñ</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <button type='submit'>Enviar Datos</button>



        </form>
    )
}

export default Formulario