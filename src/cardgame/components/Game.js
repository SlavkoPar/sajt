import React from 'react'
import PropTypes from 'prop-types'

import Board from './Board';

const Game = ({ model, nComputers, nCards, onClick, onPlay }) => {
  //console.log('model:', model)
  return (
    <div>
     
      <div style={{clear:'both'}}>
        <Board 
          {...model.game} 
          cardsDrawn={model.cardsDrawn} 
          isEndOfGame={model.isEndOfGame}
          onClick={onPlay}/>
      </div>

      {model.cardsDrawn? null :
        <button
          onClick={() => onClick(nComputers, nCards)} >
          Shuffle the cards
        </button>
      }

    </div>
  );
}

export default Game
