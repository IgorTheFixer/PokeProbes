import React, { useState, useEffect } from "react"
import EggIcon from "./EggIcon"
import ErrorList from "./ErrorList"
import _ from "lodash"

const PokemonReviewForm = props => {
  const [errors, setErrors] = useState({})
  const [pokemonReview, setPokemonReview] = useState({
    title: "",
    description: "",
    rating: 0
  })

  let audio = new Audio("/chimchar.mp3")

  const validFormSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["title", "description"]
    requiredFields.forEach(field => {
      if (pokemonReview[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const clearForm = event => {
    event.preventDefault()
    setPokemonReview({
      title: "",
      description: "",
      rating: 0
    })
    setErrors({})
  }

  const handleInputChange = event => {
    setPokemonReview({
      ...pokemonReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validFormSubmission()) {
      audio.play()
      props.submittedHandler(pokemonReview)
      setPokemonReview({
        title: "",
        description: "",
        rating: 0
      })
    }
  }

  let eggIcons = []
  for (let i = 1; i <= 5; i++) {
    const handleSetRating = () => {
      setPokemonReview({
        ...pokemonReview,
        ["rating"]: i
      })
    }

    eggIcons.push(
      <EggIcon
        key={i}
        id={i}
        handleSetRating={handleSetRating}
        className={i <= pokemonReview.rating ? "head selected" : "head"}
      />
    )
  }

  return (
    <div className="callout review-form">
      <h3>Write your Review</h3>
      <form className="form" onSubmit={onSubmitHandler}>
        <ErrorList errors={errors} />
        <div className="grid-container">
          <p>Give it an egg rating</p>
          <div className="grid-x">{eggIcons}</div>
        </div>

        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            value={pokemonReview.title}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            onChange={handleInputChange}
            value={pokemonReview.description}
          />
        </label>

        <div className="button-group">
          <button className="button" onClick={clearForm}>
            Clear
          </button>
          {/* <audio src={chimchar} autoPlay="false"></audio> */}
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default PokemonReviewForm