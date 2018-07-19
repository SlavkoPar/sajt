import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

//import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/sajt.css'
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// basename={process.env.PUBLIC_URL}
ReactDOM.render(
    <BrowserRouter> 
      <App />
    </BrowserRouter>
    , document.getElementById('root')
);

registerServiceWorker();
