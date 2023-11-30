import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import Pagination from "../components/PokedexPage/Pagination"
import { useNavigate } from "react-router-dom"


const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemons')
  const [productsPerPage, setProductsPerPage] = useState(12)
  const [currentPage, setCurrentPage] = useState(1)
  const [changeDark, setChangeDark] = useState(false)

  const trainer = useSelector(store => store.trainer)
  
  const inputSearch = useRef()
  const inputMax = useRef()

  const navigate = useNavigate()

  const max = 150
  const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${max}`
  const [pokemons, getPokemons, getTypesPokemon] = useFetch(url)
  
  const lastindex = currentPage * productsPerPage
  const firstIndex = lastindex - productsPerPage

  const handleMax = (e) => {
    e.preventDefault()
    setProductsPerPage(inputMax.current.value.trim())
  }

  useEffect(() => {
    if (typeSelected === 'allPokemons') {
      getPokemons()
    } else {
      getTypesPokemon(typeSelected)
    }
    setInputValue('')
  }, [typeSelected])


  const handleSearch = (e) => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim().toLowerCase())
  }
  const pokeFiltered = pokemons?.results.filter(poke => poke.name.includes(inputValue))

  const pokemonsLength = pokemons?.results
  const autocomplete = () => {
    const option = []
    for (let i = 0; i < pokemonsLength?.length; i++) {
      option.push(<option key={i} value={pokemonsLength[i].name}></option>)      
    }
    return option
  }

  const handleDark = () => {
    setChangeDark(!changeDark)
  }

  const handleBack = () => {
    navigate('/')
  }
  
  return (
    <div className={`${changeDark ? 'pokedex__dark' : 'pokedex'}`}>
      <div className="pokedex__header">
        <img className="pokedex__img" src="./pokedex.png" alt="" />
        <div className="pokedex__header--uno"></div>
        <div className="pokedex__header--dos"></div>
        <img className="pokedex__header--img" src="./pokeball.png" alt="" />
        {/* <div className="pokedex__header--tres">
          <div className="pokedex__header--tres-1"></div>
        </div> */}
      </div>
      <div className="back__btn">
        <button onClick={handleBack} className="btnBack"><i className='bx bx-left-arrow-circle bx-flashing' ></i></button>
      </div>
      <div className="darkMode">
        <input type="checkbox" className="l" onChange={handleDark} checked={changeDark}/>
      </div>
      <div className="pokedex__inputSearch">
        <div className="pokedex__text">
          <span className="pokedex__inputSearch--p">Hi {trainer}, </span>
          <p className="pokedex__inputSearch--p2">Here, You can find your favorite Pokémon.</p>
        </div>
        <div className="pokedex__search">
          <form className="pokedex__search--form" onSubmit={handleSearch}>
            <input ref={inputSearch} type="text" placeholder="Enter a Pokemon name" list="pokemons"/>
            <button>Search</button>
            <datalist id="pokemons">
              {autocomplete()}
            </datalist>
          </form>
          <SelectType setTypeSelected={setTypeSelected}/>
        </div>
        <div className="pokedex_perPage">
          <p className="pokedex_perPage--title">Here, You can change pokemons per page.</p>
          <form onSubmit={handleMax} className="pokedex_perPage--form">
            <input ref={inputMax} className="pokedex_perPage--input" type="number" name="" id="" />
            <button className="pokedex_perPage--btn">Change</button>
          </form>
        </div>
      </div>
      <div className="pokedex__cards">
        {
          pokeFiltered?.slice(firstIndex, lastindex).map(poke => (
            <PokeCard 
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </div>
      <Pagination 
        productsPerPage={50}
        max={max}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default PokedexPage
