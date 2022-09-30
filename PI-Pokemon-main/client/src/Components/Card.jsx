import React from 'react'

const Card = ({ name, img, types }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={img} alt="Pokemon img" width="200px" height="250px" />
      <h5>{types?.map(e => e.name.toUpperCase() + ' ')}</h5>
    </div>
  )
}

export default Card 