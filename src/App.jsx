// import Promesas from './componentes/Promesas/Promesas'
import './App.css'
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
// import Map from './componentes/Map/map'
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer'
import NavBar from './componentes/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from './componentes/Formulario/Formulario'
import { CarritoProvider } from './context/carritoContext'





function App() {

  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/categoria/:idCategoria' element={<ItemListContainer />} />
            <Route path='/item/:idItem' element={<ItemDetailContainer />} />
          </Routes>
          <Formulario />
        </CarritoProvider>
      </BrowserRouter>

    </>
  )
}

export default App
