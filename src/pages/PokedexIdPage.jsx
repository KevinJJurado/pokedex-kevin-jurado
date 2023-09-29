
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useEffect, useState } from 'react'


const PokedexIdPage = () => {

  const [changeDark, setChangeDark] = useState(false)
  const { id } = useParams()
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const [ pokemon, getPokemon ] = useFetch(url)

  const navigate = useNavigate()
  useEffect(() => {
    getPokemon()
  }, [id])

  const handleDark = () => {
    setChangeDark(!changeDark)
  }

  const handleBack = () => {
    navigate('/pokedex')
  }

  const typeInfo = pokemon?.types[0].type.name
  return (
    <div className={`${changeDark ? 'pokedexId__dark' : 'pokedexId'}`}>
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
        <input type="checkbox" class="l" onChange={handleDark} checked={changeDark}/>
      </div>
      <div className='pokedexId__card'>
        <header className={`podekexId__card--header ${typeInfo}-gradient`}> 
          <img className='pokedexId__card--img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        </header>
        <h2 className={`pokedexId__card--id ${typeInfo}-text`}>#{pokemon?.id}</h2>
        <h2 className={`podekexId__card--name ${typeInfo}-text`}>{pokemon?.name}</h2>
        <ul className='podekexId__card--measures'>
          <li className='podekexId__card--weight'>
            <span className='podekexId__card--weight1'>Weight</span>
            <span className='podekexId__card--weight2'>{pokemon?.weight}</span>
          </li>
          <li className='podekexId__card--weight'>
            <span className='podekexId__card--weight1'>Height</span>
            <span className='podekexId__card--weight2'>{pokemon?.height}</span>
          </li>
        </ul>
        <hr className='pokedexId__hr'/>
        <div className='podekexId__card--skills'>
          <ul className='podekexId__card--skills-names'>
            <li>Type</li>
            <li>Abilities</li>
          </ul>
          <ul className='podekexId__card--skills-values'>
            {
              pokemon?.types.map(typeInfo => (
                <li className={`podekexId__card-types ${typeInfo.type.name}-type`} key={typeInfo.type.url}>
                 {typeInfo.type.name}
                </li>
              ))
            }  
            {
              pokemon?.abilities.map(abilitiesInfo => (
                <li className='podekexId__card-abilities' key={abilitiesInfo.ability.url}>
                  {abilitiesInfo.ability.name}
                </li>
              ))
            }             
          </ul>
        </div>
        <div className='podekexId__card--stats'>
          <h2 className='podekexId__card--stats-title'>Stats</h2>
          <hr className='pokedexId__hr'/>
          <ul className='podekexId__card--list'>
            <li className='podekexId__card--item'>HP</li>
            <li className='podekexId__card--item2'>
              <span className={`podekexId__card--percentage ${typeInfo}-percentage`} style={{ '--wth': `${pokemon?.stats[0].base_stat}%` }}>%</span>
              <span>{pokemon?.stats[0].base_stat}/150</span>
            </li>
            <li className='podekexId__card--item'>Attack</li>
            <li className='podekexId__card--item2'>
              <span className={`podekexId__card--percentage ${typeInfo}-percentage`}style={{ '--wth': `${pokemon?.stats[1].base_stat}%` }}>%</span>
              <span>{pokemon?.stats[1].base_stat}/150</span>
            </li>
            <li className='podekexId__card--item'>Defense</li>
            <li className='podekexId__card--item2'>
              <span className={`podekexId__card--percentage ${typeInfo}-percentage`}style={{ '--wth': `${pokemon?.stats[2].base_stat}%` }}>%</span>
              <span>{pokemon?.stats[2].base_stat}/150</span>
            </li>
            <li className='podekexId__card--item'>Speed</li>
            <li className='podekexId__card--item2'>
              <span className={`podekexId__card--percentage ${typeInfo}-percentage`}style={{'--wth': `${pokemon?.stats[5].base_stat}%`}}>
              </span>
              <span>{pokemon?.stats[5].base_stat}/150</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='pokedexId__movs'>
          <h2 className='podekexId__movs--title'>Movements</h2>
          <hr className='pokedexId__hr'/>
          <div className='podekexId__movs--list'>
            {
              pokemon?.moves.slice(0, 24).map(mov => (
                <span className='podekexId__movs--name' key={mov.move.url}>
                  {mov.move.name}
                </span>
              ))
            }
          </div>
      </div>
    </div>
  )
}

export default PokedexIdPage
