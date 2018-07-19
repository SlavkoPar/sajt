

/*
let players = [];
let current = -1; // of last computer

let currentHand = {}

let nextPlayer = () => {
  current = players[current].nextIndex;
  return players[current]
}
*/

const playMiddleware = store => next => action => {
  if (!action.meta || action.meta.type !== 'play') {
    return next(action);
  }
  
  let newAction = Object.assign({}, action, {
  });
  delete newAction.meta;
  store.dispatch(newAction);

}

export default playMiddleware