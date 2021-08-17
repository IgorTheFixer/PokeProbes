import React from 'react'
import Pokemons from '../../../assets/images/pokemons.png'

const NewPokemonTile = () => {
  return (
    <div className="cell small-6 medium-4">
      <a href="/pokemons/new">
        <div className="card pokemon-card">
          <img className="pokemon-card-image" 
          src={Pokemons} 
          alt="pokemon image"/>
          <div className="card-section pokemon-card-section">
            <h3>Your New Pokemon</h3>
          </div>
        </div>
      </a>
    </div>
  )
}

export default NewPokemonTile