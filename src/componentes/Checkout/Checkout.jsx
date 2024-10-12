import { useState, useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { db } from "../../service/config"
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore"





const Checkout = () => {

  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [direccion, setDireccion] = useState("")
  const [error, setError] = useState("")
  const [ordenId, setOrdenId] = useState("")


  const { carrito, compraFinalizada, total } = useContext(CarritoContext)

  const manejadorFormulario = (e) => {
    e.preventDefault()

    if (!nombre || !apellido || !email || !telefono || !direccion) {
      setError("Por favor completa todos los campos")
      return;
    }



    const orden = {
      items: carrito.map(prod => ({
        id: prod.producto.id,
        nombre: prod.producto.nombre,
        cantidad: prod.cantidad
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email
    }




    Promise.all(
      orden.items.map(async (productoOrden) => {
        const productoRef = doc(db, "gigastock", productoOrden.id)

        const productoDoc = await getDoc(productoRef)
        const stockActual = productoDoc.data().stock

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad
        })
      })
    )
      .then(() => {
        addDoc(collection(db, "ordenes"), orden)
          .then(docRef => {
            setOrdenId(docRef.id)
            compraFinalizada()
            setNombre("")
            setApellido("")
            setDireccion("")
            setEmail("")
            setTelefono("")

          })

          .catch(error => {
            console.log("Error al crear la orden", error)
            setError("Se produjo un error al crear la orden")
          })

      })
      .catch((error)=>{
        console.log("No se pudo actualizar el stock",error)
        setError("No se puede actualizar el stock")
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
            <strong>¡Gracias por tu compra!<br />Tu numero de orden es: {ordenId} </strong>
          )
        }
      </form>
    </div>
  )
}

export default Checkout