import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Preload } from '../screens/Preload';
import { Home } from '../screens/Home';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import TabRoutes from './tab.routes';

const { Screen, Navigator } = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Navigator
      initialRouteName='Preload'
      screenOptions={{
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
      <Screen name="SignIn" component={SignIn} options={{ headerShown: true, title: 'Entrar' }} />
      <Screen name="SignUp" component={SignUp} options={{ headerShown: true, title: 'Cadastrar' }} />
      <Screen name="Tabs" component={TabRoutes} />
    </Navigator>
  )
}

export default StackRoutes
