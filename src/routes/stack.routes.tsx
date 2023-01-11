import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Preload } from '../screens/Preload';
import { Home } from '../screens/Home';
import { Chats } from '../screens/Chats';

const { Screen, Navigator } = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Preload" component={Preload} />
      <Screen name="Home" component={Home} />
      <Screen name="Chats" component={Chats} />
    </Navigator>
  )
}

export default StackRoutes
