import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';

import { firebase } from './config/firebaseConfig'
import { store } from './store';

import Routes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
      <StatusBar style="auto" />
    </Provider>
  );
}
