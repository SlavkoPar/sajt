
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import initialState from './initialstate';
import Actions from './actions';
import myReducers from './reducers';
import { install } from 'redux-loop';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import CardGame from './CardGame'; 
import { store } from './CardGame'; 



it('renders without crashing', () => {
  const wrapper = mount(<CardGame/>);
  const btn = wrapper.find('Game').find('button');
  expect(btn.length).toEqual(1);
});


const allCodes = ["7D", "5D", "AS", "JS", "3S", "2D", "4H", "7S", "9H", "0S", "5H", "9S", "0D", "5C", "AD", "8H", "6D", "QS", "7H", "4S", "0C", "7C", "0H", "3C", "6S", "8S", "KC", "QH", "9C", "8D", "4C", "KD", "2H", "6H", "JD", "6C", "2C", "AC", "8C", "JH", "QC", "KH", "KS", "2S", "JC", "3D", "3H", "4D", "AH", "5S", "QD", "9D"]
const getCard = () => {
  const index = getRandomInt(0, allCodes.length);
  const code = allCodes.splice(index, 1);
  //console.log('ZABA:' + code)
  return { cards: [{ image:`https://deckofcardsapi.com/static/img/${code}.png`, code, suit : '' }] }
}

it('shuffled N cards', () => {
  
  const nComputers = 3;
  const nCards = 10;

  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  fetchMock.getOnce('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', { deck_id: 12345 });
  fetchMock.get('https://deckofcardsapi.com/api/deck/12345/draw/?count=1', getCard);

  const wrapper = mount(<CardGame/>);
  const btn = wrapper.find('Game').find('button');
  //btn.simulate('click');
  // can't use simulate, because test would complete and exit before shuffleDeck has performed
  return store.dispatch(Actions.setInitialState({ nComputers, nCards })).then(() => {
      console.log("state after initilization)", store.getState())
      return store.dispatch(Actions.shuffleDeck()).then(() => {
        const state = store.getState().toJS()
        expect(state.human.cards.length).toEqual(nCards)
        expect(state.computers.length).toEqual(nComputers)
        state.computers.forEach(computer => expect(computer.cards.length).toEqual(nCards));
      })
  })

});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


