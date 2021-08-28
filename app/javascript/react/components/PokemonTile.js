import React from 'react'
import MysteryPokemon from '../../../assets/images/mystery-pokemon.jpg'
import {Link} from 'react-router-dom'

const PokemonTile = (props) => {
  let pokemonImg
  if(props.photo === null){
    pokemonImg = <img className="pokemon-card-image" src={MysteryPokemon}/>
  } else {
    pokemonImg = <img className="pokemon-card-image" src={props.photo}/>
  }

  return (
    <div className="cell small-6 medium-4">
      <Link to={`/pokemons/${props.id}`}>
        <div className="card pokemon-card">
          {pokemonImg}
          <div className="card-section pokemon-card-section">
            <h3>{props.name}</h3>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PokemonTile