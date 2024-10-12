import { useState, useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { db } from "../../service/config"
import { collection, addDoc } from "firebase/firestore"





const Checkout = () => {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [direccion, setDireccion] = useState("")
  const [error, setError] = useState("")
  const [ordenId, setOrdenId] = useState("")


  const { carrito, vaciarCarrito, total } = useContext(CarritoContext)

  const manejadorFormulario = (e) => {
    e.preventDefault()

    if (!nombre || !apellido || !email || !telefono || !direccion) {
      setError("Por favor completa todos los campos")
      return;
    }



    const orden = {
      items: carrito.map(prod => ({
        id: prod.id,
        nombre: prod.nombre,
        cantidad: prod.cantidad
      })),
      total: total,
      fecha: new Date(),
      nombre: { nombre },
      apellido: { apellido },
      telefono: { telefono },
      email: { email },
    }

    addDoc(collection(db, "ordenes"),orden)
      .then(docRef => {
        setOrdenId(docRef.id)
        vaciarCarrito()
      })
      .catch(error => {
        console.log("Error al crear la orden", error)
        setError("Se produjo un error al crear la orden")
      })


  }

  return (
    <div>
      <form onSubmit={manejadorFormulario}>
        {
          carrito.map(prod => (
            <div key={prod.producto.id}>
              <p>{prod.producto.nombre}</p>
              <p>{prod.producto.precio} * {prod.cantidad}</p>
              <p>{prod.producto.precio}</p>
              <hr />
            </div>
          ))
        }
        <div>
          <label htmlFor="">Nombre</label>
          <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
        </div>
        <div>
          <label htmlFor="">Apellido</label>
          <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <label htmlFor="">Telefono</label>
          <input type="number" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
          <label htmlFor="">Direccion</label>
          <input type="text" onChange={(e) => setDireccion(e.target.value)} value={direccion} />
        </div>
        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        <button type="submit">Confirmar Compra</button>
        {
          ordenId && (
            <strong>Gracias por tu compra {nombre} <br />Tu numero de orden es: {ordenId} </strong>
          )
        }
      </form>
    </div>
  )
}

export default Checkout