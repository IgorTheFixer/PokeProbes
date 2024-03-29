import React from "react"
import ReviewTile from "./ReviewTile"

const ReviewList = props => {
  const { reviews, pokemon, deleteReview, currentUser, addVote } = props

  let reviewList = reviews.map(review => {
    const handleDeleteReview = () => {
      deleteReview(review.id)
    }

    return (
      <ReviewTile
        key={review.id}
        title={review.title}
        reviewId={review.id}
        description={review.description}
        rating={review.rating}
        deleteReview={handleDeleteReview}
        postedUser={review.user}
        currentUser={currentUser}
        pokemonId={pokemon.id}
        votes={review.votes}
        addVote={addVote}
      />
    )
  })

  return (
    <div>
      <h2>Reviews:</h2>
      {reviewList}
    </div>
  )
}

export default ReviewList