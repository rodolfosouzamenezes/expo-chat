import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { firebase } from './config/firebaseConfig'

import Routes from './routes';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="auto" />
    </>
  );
}
