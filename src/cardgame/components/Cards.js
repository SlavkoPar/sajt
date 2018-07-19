import React from 'react'
import PropTypes from 'prop-types'
import Card from './Card'

const Cards = ({ cards, incr }) => (
  <div style={{position:'relative'}}>
    {cards.map((card, index) => (
      <div key={card.code} style={{position:'absolute', top:index*25+'px', left:index*incr+'px'}}>
        <Card {...card} />
      </div>
    ))}
  </div>
)


export default Cards
