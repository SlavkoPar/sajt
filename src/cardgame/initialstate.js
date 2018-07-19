import { fromJS } from 'immutable';

const  initialState = fromJS({
  loading: false,

  nComputers: 0,
  nCards: 0,
  deck_id: 0,

  nthDraw : 0,
  cardsDrawn: false,
  isEndOfGame: false,

  game: {
    currentHand: -1,
    hands : []
  },

  human:  {
    nickname: 'Slavko',
    profile_pic: 'assets/img/avatars/Human.png',
    cards : [],
    nHandsWon : 0 
  },

  computers : [],

  winners: [],



});


export default initialState
