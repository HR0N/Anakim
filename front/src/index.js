import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './mediaqueries.scss'
import './variables.scss'
import './fonts.scss'
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from './redux/reducers/rootReducer';
require('dotenv').config();

const store = createStore(rootReducer, applyMiddleware(thunk));
document.title = 'Anakim';
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
export {store};


ReactDOM.render(
  <React.StrictMode>
      {app}
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
