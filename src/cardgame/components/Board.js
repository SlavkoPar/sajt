import React from 'react'
import PropTypes from 'prop-types'


import Card from './Card';


const drawHand = (hand, iHand) => {
  return <div key={iHand}>
            {/* <hr style={{width:'300px'}}/> */}
            <ul className='card-list'> 
              {hand.cards.map((card, index) => (
                <li key={card.code}>
                  <Card {...card} isWinner={index===hand.winnerCard} />
                </li>
              ))}
            </ul> 
         </div>
}


const Board = ({ hands, cardsDrawn, isEndOfGame, onClick }) => {

  return (
    <div>
      { hands.map((hand, index) => (drawHand(hand, index)) )}

      {cardsDrawn && !isEndOfGame ?
        <button 
          onClick={() => onClick() }>
          Play
        </button>
        : null}

    </div>
  );
}

export default Board


