import React, { Component } from "react";
import "./CardGame.css";

import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

// Import functions
import { install } from 'redux-loop'

import Actions from './actions'
import playMiddleware from './middlewares/playMiddleware';

import Game from  './components/Game'
import Human from './components/Human'
import Computer from './components/Computer';


import './components/Player.css';

import myReducers from './reducers'


// Create the store
const store = createStore(
    myReducers, 
    applyMiddleware(
      playMiddleware
    ),
    install()
  )

// Dispatch actions
setTimeout( () => {
   //store.dispatch(Actions.playHand())
}, 2000);

/*
 * Careful here! Our top level state is a an Immutable Map, and `connect()` in
 * react-redux attempts to spread our state object over our components, so we
 * need to make sure the state is contained in a single property within our
 * component's `props`. We'll call it `model` here, to be a little more like
 * Elm 😄, and we'll also deserialize it to a plain object for convenience.
*/
const connector = connect((state) => ({ model: state.toJS() }));

/*
 * This component is our top-level app structure which recieves the state from
 * our store. Some of the rendering will be delegated to the components
 * we set up earlier. 
 */
const App = connector(({ model, dispatch }) => {
  //const anyLoading = model.short.loading || model.long.loading;
  return (
    
    <div className="wrapper">
      <header className="header">
      </header>
      <article className="main">
        <Game 
            model={model} 
            nComputers='3' 
            nCards='5'             
            onClick={(nComputers, nCards) => {
              dispatch(Actions.setInitialState({nComputers, nCards}));
              dispatch(Actions.shuffleDeck());
            }}
            onPlay={() => {
              dispatch(Actions.playHand());
            }}            
        />
      </article>
      
      <aside className="aside aside-1">
        <Human {...model.human} />
      </aside>

      <aside className="aside aside-2">
        <ul className="flex-container">
          {model.computers.map(computer => (
            <li key={computer.computerId} className="flex-item">
              <Computer {...computer} />
            </li>
          )) }  
        </ul>
      </aside>

      <footer className="footer">
        Winners are: {model.winners.map((winner, index) => 
                        <div key='index'>{winner}</div>)}
      </footer>
    </div>          
    
  );

});


class CardGame extends Component {

  render() {
    return (
      <div className="CardGame">
        <Provider store={store}>
          <App />
        </Provider>
      </div>
    );
  }
}

export default CardGame;