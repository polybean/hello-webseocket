import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Chatroom from './components/Chatroom';
import store from './store';
import * as wsock from './utils/ws';

const App = () => <Chatroom />;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

wsock.checkin(store.getState().user);
