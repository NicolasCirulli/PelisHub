import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './components/Comments/comentario.css'
import App from './App';
import '../src/components/NavBar/navbar.css'
import '../src/components/Footer/footer.css'
import '../src/components/CardPeliculas/cardpeliculas.css'


// redux 

import { createStore, applyMiddleware,compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(mainReducer,composeEnhancer(applyMiddleware( thunk )));


ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

