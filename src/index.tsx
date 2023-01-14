import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

import Routes from './routes';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <Provider store={store}>
      <Toast />
      <Routes />
    </Provider>
  );
}
