
// Import functions
import initialState from './initialstate'
import Actions from './actions'

import { createReducer } from 'redux-act';
import { Cmd, loop } from 'redux-loop'
import { fromJS } from 'immutable';

import { shuffleDeckRequest, drawTheCardRequest } from './fetchRequests';

const Api = {

  shuffleDeck : function() {
    //return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    //          .then(resp => resp.json())
    // moved to fetchRequests to enable fetch-mock
    return shuffleDeckRequest()
  },

  drawTheCard : (deck_id) => (
    //fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    //          .then(resp => resp.json())
    // moved to fetchRequests to enable fetch-mock
    drawTheCardRequest(deck_id)
  ),

  humanThinking : (currentHand) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject();  // gave up 
        resolve();
      }, 1000);
    })
    .then(() => currentHand)
  ),

}


// helper to enable cycling of the players
let Players = {
  players : [],
  current : -1,
  addPlayer : function(player) { this.players.push(player) },
  nextId : function() {
    this.current = this.players[this.current].nextIndex;
    return this.players[this.current].computerId
  },
  fixIndexes : function()  {
    this.players[this.players.length-1].nextIndex = 0;
    this.current = this.players.length-1;
    this.lastComputerId = this.players[this.players.length-1].computerId; 
  },
  lastComputerId : -1
}

/*
 * Create reducers
 */

const myReducers = createReducer({

  /*
    * set Initial State
   */
  [Actions.setInitialState]: (state, payload)=> {
    const nicknames = ['Houdini', 'Lang', 'Master', 'Fritz', 'Deep', 'Blue', 'Mikhail', 'Leela', 'Deveti']

    Players.addPlayer({ computerId: -1, nextIndex:1})

    const computerIds = (n) => {
      var a = [];
      for(var i=0; i < n; i++) 
        a.push(i);
      return a;
    }

    let ind = 1; // number of humans
    let comps = computerIds(payload.nComputers).map(i => {
      Players.addPlayer({ computerId: i, nextIndex:++ind})
      return {
        nickname: nicknames[i],
        profile_pic: 'assets/img/avatars/computer.jpg',
        computerId: i,
        cards : [],
        nHandsWon : 0 
      } 
    }) 
    Players.fixIndexes()

    return state
            .set('nComputers', Number.parseInt(payload.nComputers))
            .set('nCards', Number.parseInt(payload.nCards))
            .set('computers', fromJS(comps))
  },

  /*
    * shuffle Deck
   */
  [Actions.shuffleDeck]: (state) => {
    return loop(
      state,
      Cmd.run(Api.shuffleDeck, {
        successActionCreator: Actions.shuffleDeckSucceed,
        failActionCreator: Actions.shuffleDeckFail
      })
    );
  },

  [Actions.shuffleDeckSucceed]: (state, json) => {
    return loop(
      state
        .set('deck_id', json.deck_id)
        .set('nthDraw', 1),
      Cmd.action(Actions.drawTheCard())
    );
  },

  [Actions.shuffleDeckFail]: (state ) => {
    alert('shuffleDeckFail')
  },


  /*
   * draw the card
   */
  [Actions.drawTheCard]: (state) => {
    
    return loop(
      state,
      Cmd.run(Api.drawTheCard, {
        successActionCreator: Actions.drawTheCardSucceed,
        failActionCreator: Actions.drawTheCardFail,
        args: [state.get('deck_id')]
      })
    );
  },


  [Actions.drawTheCardSucceed]: (state, json) => {
    const cardValue = { 'A': 1, '2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'0': 10,'J': 12,'Q': 13,'K': 14 }
    //console.log('AHHHHHHHHH', JSON.stringify(json))
    const { image, code, suit } = json.cards[0];
    const value =  cardValue[code[0]];

    const nthDraw = state.get('nthDraw');
    const nCards = state.get('nCards');

    let cardsDrawn = false;
    let computerId = Players.nextId();
    let state2;
    if (computerId === -1) {
      state2 = state
        .update('nthDraw', nthDraw => nthDraw+1)
        .updateIn(['human', 'cards'], cards => cards.concat([fromJS({ image, code, value, suit })]));
    }
    else {
      state2 = state.updateIn(['computers', computerId, 'cards'], cards => cards.concat([fromJS({ image, code, value, suit })])); 
      cardsDrawn =  nthDraw > nCards && computerId === Players.lastComputerId
      if (cardsDrawn)
        state2 = state2.set('cardsDrawn', true)
    }

    return cardsDrawn 
      ? state2
      : loop(
          state2,
          Cmd.action(Actions.drawTheCard())
        )
  },

  [Actions.drawTheCardFail]: (state, json) => {
    alert('drawTheCardFail')
  },


  /*
    * Game
   */
  [Actions.playHand]: (state, payload)=> {

    console.log('playHand', state.getIn(['game', 'currentHand']))
    let currentHand = state.getIn(['game', 'currentHand']);
    currentHand++;

    return loop(
      state
        .updateIn(['game', 'hands'], hands => hands.concat([fromJS({cards:[], winnerCard:-1})]))
        .setIn(['game', 'currentHand'], currentHand),
      Cmd.action(Actions.humanToPlay(currentHand))
    );
  },

  /*
   * Human to play
   */ 
  [Actions.humanToPlay]: (state, currentHand) => {
    
    return loop(
      state,
      Cmd.run(Api.humanThinking, {
        successActionCreator: Actions.humanToPlaySucceed,
        failActionCreator: Actions.humanToPlayFail,
        args: [currentHand]
      })
    );
  },

  [Actions.humanToPlaySucceed]: (state, currentHand) => {
    let cards = state.getIn(['human', 'cards']);
    let card =  cards.minBy(x => x.get('value'));
    const minValue = card.get('value')
    const iCard = cards.findIndex(card => card.get('value') === minValue);
    
    return loop(
      state.setIn(['human', 'cards'], cards.delete(iCard)),
      Cmd.action(Actions.humanPlayed({currentHand, card}))
    );
  },

  [Actions.humanToPlayFail]: (state, currentHand, card) => {
    // human gave up
  },


   /*
   * Human played
   */ 
  [Actions.humanPlayed]: (state, payload) => {
    console.log("humanPlayed", payload.card.toJS())
    return loop(
      state.updateIn(['game', 'hands', payload.currentHand, 'cards'], cards => cards.concat([payload.card])), 
      Cmd.action(Actions.computerToPlay({ computerId:0, currentHand:payload.currentHand }))
    );
  },

  /*
   * Computer to play
   */ 
  [Actions.computerToPlay]: (state, { computerId, currentHand } ) => {

    console.log("computerToPlay", currentHand)

    let handCards = state.getIn(['game', 'hands', currentHand, 'cards']);
    let maxCard =  handCards.maxBy(x => x.get('value'));
    let maxValue =  maxCard.get('value');

    let cards = state.getIn(['computers', computerId, 'cards']);
    let iCard = -1;

    // first, try to play the card with same value
    cards.forEach((card, index) => {
      if (card.get('value') === maxValue) {
          iCard = index;
          return false;
        }
    });

    if (iCard === -1) {
    // second, try to play the card with greater value
    cards.forEach((card, index) => {
        if (card.get('value') > maxValue) {
          iCard = index;
          return false;
        }
      });
    }

    if (iCard === -1) 
      iCard = 0; // otherwise play first

    let card =  cards.get(iCard);
    console.log("computerToPlay", card)

    return loop(
      state.setIn(['computers', computerId, 'cards'], cards.delete(iCard)),
      Cmd.action(Actions.computerPlayed({computerId, currentHand, card}))
    );
  },

  /*
   * Computer Played
   */ 

  [Actions.computerPlayed]: (state, payload) => {
    console.log("computerPlayed", payload)

    const state2 = state.updateIn(['game', 'hands', payload.currentHand, 'cards'], cards => cards.concat([payload.card]));

    const isLastComputer = payload.computerId === state.get('nComputers') - 1;
    if (!isLastComputer) // 
      return loop(
        state2,
        Cmd.action(Actions.computerToPlay({ computerId:payload.computerId+1, currentHand:payload.currentHand }))
      );
    else
      return loop(
        state2,
        Cmd.action(Actions.handPlayed(payload.currentHand))
      );
  },

  /*
   * Hand Played
   */ 

  [Actions.handPlayed]: (state, currentHand) => {
    
    // 1) find out the winner of the hand
    const cards = state.getIn(['game', 'hands', currentHand, 'cards']);
    let maxValue = 0;
    let iCard = 0;
    cards.forEach((card, index) => {
      if (card.get('value') >= maxValue) {
          maxValue = card.get('value');
          iCard = index;
        }
    });
    let state2 = state.updateIn(['game', 'hands', currentHand], hand => hand.set('winnerCard', iCard))

    if (iCard === 0)
      state2 = state2.updateIn(['human', 'nHandsWon'], nHandsWon => nHandsWon + 1)
    else
      state2 = state2.updateIn(['computers', iCard-1, 'nHandsWon'], nHandsWon => nHandsWon + 1)

    const nCards = state2.get('nCards');
    if (currentHand+1 === nCards) {
      // 2) find out the winner of the GAME
      state2 = state2.updateIn(['isEndOfGame'], isEndOfGame => true)
      let nHandsWon = state2.getIn(['human', 'nHandsWon']);
      const computers = state2.get('computers');
      const comp = computers.maxBy(computer => computer.get('nHandsWon'));
      const nHandsWonComputer = comp.get('nHandsWon');
      if (nHandsWonComputer >= nHandsWon) {
        computers.forEach(computer => {
          if (computer.get('nHandsWon') >= nHandsWonComputer)
            state2 = state2.updateIn(['winners'], winners => winners.concat([computer.get('nickname')]))
        })
      }

      if (nHandsWon >= nHandsWonComputer) {
        state2 = state2.updateIn(['winners'], winners => winners.concat([state2.getIn(['human', 'nickname'])]))
      }

      return state2;
    }
    else {
      return loop(
        state2,
        Cmd.action(Actions.playHand())
      );
    }
  }

}, initialState); // <-- This is the default state

export default myReducers