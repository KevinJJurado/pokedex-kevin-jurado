import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

const PokeCard = ({ url }) => {

  const [ pokemon, getPokemon] = useFetch(url)

  const navigate = useNavigate()

  useEffect(() => {
    getPokemon()
  }, [])

  const handleNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`)
  }
  const firstType = pokemon?.types[0].type.name
  return (
    <article className={`pokeCard ${firstType}-border`} onClick={handleNavigate}>
      <header className={`pokeCard__header ${firstType}-gradient`}>
        <img className='pokeCard__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
      </header>
      <section className='pokeCard__info'>
        <h3 className={`pokeCard__name ${firstType}-text`}>{pokemon?.name}</h3>
        <ul className='pokeCard__type'>
          {
            pokemon?.types.map(typeinfo => (
              <li className='pokeCard__type--name' key={typeinfo.type.url}>{typeinfo.type.name}</li>
            ))
          }
          
        </ul>
        <div className='pokeCard__type--type'>type</div>
        <hr />
        <ul className='pokeCard__skills'>
          {
            pokemon?.stats.map(statInfo => (
              <li className='pokeCard__skills--item' key={statInfo.stat.url}>
                <span className='pokeCard__skills--item-1'>{statInfo.stat.name}</span>
                <span className={`pokeCard__skills--item-2 ${firstType}-text`}>{statInfo.base_stat}</span>
              </li>
            ))
          }
        </ul>
      </section>
    </article>
  )
}

export default PokeCard
