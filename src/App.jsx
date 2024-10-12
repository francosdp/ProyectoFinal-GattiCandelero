import './App.css'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import NavBar from './componentes/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Formulario from './componentes/Formulario/Formulario';
import { CarritoProvider } from './context/carritoContext';
import Cart from './componentes/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './componentes/Checkout/Checkout';
// import Productos from './componentes/Productos/Productos'





function App() {

  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          {/* <Productos/> */}
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/categoria/:idCategoria' element={<ItemListContainer />} />
            <Route path='/item/:idItem' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/formulario' element={<Formulario />} />
            <Route path='*' element={<h2>Esta seccion aun no se encuentra disponible</h2>} />
          </Routes>
        </CarritoProvider>
        <ToastContainer/>
      </BrowserRouter>

    </>
  )
}

export default App
