import React, { useState, useEffect } from "react"
import PokemonTile from "./PokemonTile"
import IndexChimchar from "../../../assets/images/index-chimchar.png"
import NewPokemonTile from "./NewPokemonTile"

const PokemonIndex = props => {
  const [pokemons, setPokemons] = useState([])
  let audio = new Audio("/chimchar.mp3") 

  const fetchPokemons = async () => {
    try {
      const response = await fetch("/api/v1/pokemons")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setPokemons(responseBody.pokemons)
    } catch (err) {
      console.error("Error in fetch!")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  const pokemonList = pokemons.map(pokemon => {
    return (
      <PokemonTile
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        photo={pokemon.photo_path.url}
      />
    )
  })

  return (
    <div className="grid-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-6 medium-4">
          <img src={IndexChimchar} alt="chimchar" className="index-chimchar" onClick={() => audio.play()}/>
        </div>
        <div className="cell small-6 medium-8">
          <h1>Welcome to Poke Reviews!</h1>
          <h3>The best Pokemon ratings around!</h3>
        </div>
      </div>
      <div className="grid-x grid-margin-x">
        <NewPokemonTile />
        {pokemonList}
      </div>
    </div>
  )
}

export default PokemonIndex