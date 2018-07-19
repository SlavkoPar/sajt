import React from 'react'; 
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import { configure } from 'enzyme';
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import App from './App'; 

it('renders without crashing', () => {
  const div = document.createElement('div');
  //ReactDOM.render(
  //  <BrowserRouter> 
  //    <App />
  //  </BrowserRouter>, div);
  //ReactDOM.unmountComponentAtNode(div);
  shallow(<BrowserRouter><App/></BrowserRouter>)
});
