import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Preload } from '../screens/Preload';
import { Home } from '../screens/Home';
import { Chats } from '../screens/Chats';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

const { Screen, Navigator } = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Navigator screenOptions={{
      headerShown: false,
      animation: 'fade',
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 22,
      },
      headerStyle: {
        backgroundColor: '#0fa958',
      }
    }}>
      <Screen name="Preload" component={Preload} />
      <Screen name="Home" component={Home} />
      <Screen name="Chats" component={Chats} />
      <Screen name="SignIn" component={SignIn} options={{ headerShown: true, title: 'Entrar' }} />
      <Screen name="SignUp" component={SignUp} options={{ headerShown: true, title: 'Cadastrar' }} />
    </Navigator>
  )
}

export default StackRoutes
