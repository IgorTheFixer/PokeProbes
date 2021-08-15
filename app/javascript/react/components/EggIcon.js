import React from 'react'
import Egg from '../../../assets/images/egg_icon.png'

const EggIcon = (props) => {
  const { id, handleSetRating, className } = props

  return (
    <div>
      <img
        src={Egg}
        className={className}
        onClick={handleSetRating}
      />
    </div>
  )
}

export default EggIcon