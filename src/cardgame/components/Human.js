import React from 'react'
import PropTypes from 'prop-types'
import Cards from './Cards'

const Human = ({ nickname, profile_pic, cards, nHandsWon  }) => (
  

  <div className="Player">
      <img src={profile_pic} alt={nickname} className="Player__pic" />

      <div className="Player__details">
        <p className="Player__details-nickname">{nickname}</p>
        <p className="Player__details-nickname">Wins: {nHandsWon}</p>
        <Cards cards={cards} incr='5'/>
      </div>

    </div>

)


export default Human
