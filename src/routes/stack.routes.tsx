import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Preload } from '../screens/Preload';

const { Screen, Navigator } = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Preload" component={Preload} />
      <Screen name="Home" component={Home} />
    </Navigator>
  )
}

export default StackRoutes
