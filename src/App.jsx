
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/HomePage.css'
import './styles/PokeCard.css'
import './styles/PokedexPage.css'
import './styles/PokedexIdPage.css'
import './styles/Pagination.css'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage.jsx'
import PokedexIdPage from './pages/PokedexIdPage'
import ProtectedRoutes from './pages/ProtectedRoutes'


function App() {

  return (
    <div className='principal'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<PokedexPage/>}/>
          <Route path='/pokedex/:id' element={<PokedexIdPage/>}/>

        </Route>
      </Routes>
    </div>
  )
}

export default App
