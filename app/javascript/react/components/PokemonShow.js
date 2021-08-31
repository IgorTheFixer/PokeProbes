import React, { useState, useEffect } from "react"
import PokemonReviewForm from "./PokemonReviewForm"
import ReviewList from "./reviews/ReviewList"
import _ from "lodash"
import MysteryPokemon from "../../../assets/images/mystery-pokemon.jpg"

const PokemonShow = props => {
  const [pokemon, setPokemon] = useState({
    name: "",
    body: "",
    rating: 0,
    photo_path: "",
    reviews: []
  })

  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: "",
    profile_photo: "",
    role: ""
  })

  const [type, setType] = useState("Click For Pokemon's Type!")
  const [typeTwo, setTypeTwo] = useState("")

  const [image, setImage] = useState("unknown.webp")

  const typeClick = event => {
    event.preventDefault()
    fetchType(); 
  }

  const submittedHandler = review => {
    postReview(review)
  }

  const fetchPokemon = async () => {
    try {
      let pokemonId = props.match.params.id
      const response = await fetch(`/api/v1/pokemons/${pokemonId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const responseBody = await response.json()
      setPokemon({
        ...responseBody.pokemon,
        ["reviews"]: responseBody.pokemon.reviews
      })
      setCurrentUser({
        id: responseBody.pokemon.current_user.id,
        username: responseBody.pokemon.current_user.username,
        profile_photo: responseBody.pokemon.current_user.profile_photo,
        role: responseBody.pokemon.current_user.role
      })
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [])

  const fetchType = async () =>{
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const responseBody = await response.json()
      setType(responseBody.types[0].type.name)
      setImage(`${responseBody.types[0].type.name}.webp`)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const postReview = async formPayload => {
    try {
      let pokemonId = props.match.params.id
      const response = await fetch(`/api/v1/pokemons/${pokemonId}/reviews`, {
        credentials: "same-origin",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formPayload)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const newReview = await response.json()
      let pokemonReviewsList = pokemon.reviews
      pokemonReviewsList = pokemonReviewsList.concat(newReview.review)
      setPokemon({
        ...pokemon,
        ["reviews"]: pokemonReviewsList
      })
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const deleteReview = async reviewId => {
    try {
      const response = await fetch(
        `/api/v1/pokemons/${pokemon.id}/reviews/${reviewId}`,
        {
          credentials: "same-origin",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const responseBody = await response.json()
      setPokemon({
        ...pokemon,
        ["reviews"]: responseBody.reviews
      })

    } catch (err) {
      console.error(err)
    }
  }

  const addVote = (vote) => {
    let reviews = pokemon.reviews
    let review = reviews.filter(review => review.id == vote.review.id)
    review = review[0]
    review.votes.push(vote)
    setPokemon({
      ...pokemon,
      ["reviews"]: reviews
    })
  }

  let pokemonImg
  if(pokemon.photo_path.url === null){
    pokemonImg = <img className="pokemon-photo" src={MysteryPokemon}/>
  } else {
    pokemonImg = <img className="pokemon-photo" src={pokemon.photo_path.url}/>
  }

  return (
    <div className="grid-container">
      <div className="grid-x">
        <div className="cell small-12 medium-6">
          {pokemonImg}
          <h1>{pokemon.name}</h1>
          <p>{pokemon.body}</p>
          <h2>Type</h2>
          <h3 onClick={typeClick}>{type}</h3>
          <img src={`../${image}`}/>
          <PokemonReviewForm submittedHandler={submittedHandler} />
        </div>
        <div className="cell small-12 medium-6">
          <ReviewList
            reviews={pokemon.reviews}
            pokemon={pokemon.id}
            deleteReview={deleteReview}
            currentUser={currentUser}
            addVote={addVote}
          />
        </div>
      </div>
    </div>
  )
}

export default PokemonShow