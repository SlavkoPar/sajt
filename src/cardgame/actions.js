import { createAction } from 'redux-act';

// Create an action creator (description is optional)
const Actions = {
  
  setInitialState : createAction('set nCards and nComputers'),

  shuffleDeck: createAction('shuffle Deck'),
  shuffleDeckSucceed: createAction('shuffle Deck Succeed'),
  shuffleDeckFail: createAction('shuffle Deck Fail'),

  drawTheCard: createAction('draw the Card'),
  drawTheCardSucceed: createAction('draw the Card Succeed'),
  drawTheCardFail: createAction('draw the Card Fail'),
  
  playHand : createAction('play hand'),
  handPlayed : createAction('hand played'),

  humanToPlay : createAction('human to play'),
  humanToPlaySucceed : createAction('human completed thinking and chosen the crad'),
  humanToPlayFail : createAction('human gave up'),
  
  humanPlayed : createAction('human played'),

  computerToPlay : createAction('computer to play'),
  computerPlayed : createAction('computer played'),
}


export default Actions;