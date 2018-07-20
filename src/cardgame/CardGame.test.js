
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme'

import CardGame from './CardGame'; 

it('renders without crashing', () => {
  const wrapper = mount(<CardGame/>);
  const btn = wrapper.find('Game').find('button');
  //btn.simulate('click')
  const human = wrapper.find('Human')
  expect(btn.length).toEqual(1);
});

