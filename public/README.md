This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[Try it](https://slavkopar.github.io/sajt/)

Where to keep businees logic in <b>React/Redux</b> application?

In a reducer we make decisions, and what should be done next.
So, we have business logic in a reducer.

The values returned from the reducer when scheduling an effect with <i><b>redux-loop</b></i> only describe the effect. Calling the reducer will not cause the effect to run. The value returned by the reducer is just an object that the store knows how to interpret when it is enhanced by <i><b>redux-loop</b></i>. You can safely call a reducer in your tests without worrying about waiting for effects to finish and what they will do to your environment.

Application flow of demo app <br>card-game</br>, is presented here. Real code we have on github, but here some code is removed for brevity.

### Code

```js

/*
 * Use the actions themselves as keys for the reducers 
 * rather than strings which are error prone. 
 */
const Actions = {
  setInitialState : createAction('set nCards and nComputers'),

  shuffleDeck: createAction('shuffle Deck'),
  shuffleDeckSucceed: createAction('shuffle Deck Succeed'),
  shuffleDeckFail: createAction('shuffle Deck Fail'),

  drawTheCard: createAction('draw the Card'),
  drawTheCardSucceed: createAction('draw the Card Succeed'),
  drawTheCardFail: createAction('draw the Card Fail'),
  
  playHand : createAction('play hand'),

  humanToPlay : createAction('human to play'),
  humanToPlaySucceed : createAction('human completed thinking and chosen the card'),
  humanToPlayFail : createAction('human gave up'),
  
  humanPlayed : createAction('human played'),

  computerToPlay : createAction('computer to play'),
  computerPlayed : createAction('computer played'),

  handPlayed : createAction('hand played')
}

const Api = {
  shuffleDeck : function() {
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
              .then(resp => resp.json())
  },

  drawTheCard : (deck_id) => (
    fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
              .then(resp => resp.json())
  ),
  
  humanThinking : (currentHand) => (
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject();  // gave up 
        resolve();
      }, 1000);
    })
    .then(() => currentHand)
  )
}


const myReducers = createReducer({
  /*
    * set Initial State
   */
  [Actions.setInitialState]: (state, payload)=> {
    // ...
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
    // ...
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
    // ...
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
    // ...
    return loop(
      state.setIn(['computers', computerId, 'cards'], cards.delete(iCard)),
      Cmd.action(Actions.computerPlayed({computerId, currentHand, card}))
    );
  },

  /*
   * Computer Played
   */ 

  [Actions.computerPlayed]: (state, payload) => {
    // ...
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
    // ...

    if (currentHand+1 === nCards) {
      // 2) find out the winner of the GAME
      ...
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


/*
 * This component is our top-level app structure 
 * which recieves the state from our store. 
 * Some of the rendering will be delegated 
 * to the components we set up earlier. 
 */

const App = connector(({ model, dispatch }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div className="App-intro">
        <Game 
            model={model} 
            nComputers='3' 
            nCards='10'             
            onClick={(nComputers, nCards) => {
              dispatch(Actions.setInitialState({nComputers, nCards}));
              dispatch(Actions.shuffleDeck());
            }}
            onPlay={() => {
              dispatch(Actions.playHand());
            }}            
            />
      </div>
    </div>
  );
});


/*
 * No need to create Container components.
 * Redux Store holds the whole state tree of application, 
 * and our Components are Stateless.
*/
const Game = ({ model, nComputers, nCards, onClick, onPlay }) => {
  return (
    <div>
      <Human {...model.human} />

      {model.computers.map(computer => (
          <Computer {...computer} />
      )) }

      <Board 
        {...model.game} 
        onClick={onPlay}/>
    </div>
  );
}

/*
 * Board:onClick  -->  Game:onClick  -->  App:onPlay = {() { dispatch(Actions.playHand()); }}
 */
const Board = ({ hands, cardsDrawn, onClick }) => {
  return (
    <div>
      { hands.map((hand, index) => (drawHand(hand, index)) )}

      {cardsDrawn?
        <button 
          onClick={() => onClick() }>
          Play
        </button>
        : null}

    </div>
  );
}


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

```

