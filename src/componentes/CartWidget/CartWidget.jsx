import './CartWidget.css'
import { useContext } from 'react'
import { CarritoContext } from '../../context/carritoContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {

  const {cantidadTotal} = useContext(CarritoContext)




  return (
    <div>
      <Link to='/cart'>
        <img className='CartImg' src="/public/img/cart-shopping-svgrepo-com.svg" alt="Carrito de Compra" />
      </Link>
      {
        cantidadTotal > 0 && <strong className='cantidadTotal'>{cantidadTotal}</strong>
      }

    </div>
  )
}

export default CartWidget