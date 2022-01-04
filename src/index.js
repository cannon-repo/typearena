import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TypeArena from "./Components/TypeArena";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <TypeArena />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);