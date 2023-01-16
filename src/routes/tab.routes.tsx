import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Config } from '../screens/Config';
import { Contacts } from '../screens/Contacts';
import ChatStackRoutes from './chatStack.routes';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Navigator initialRouteName='ChatList' screenOptions={{}}>
      <Screen name='ChatStack' component={ChatStackRoutes} options={{title: 'Conversas'/*, tabBarBadge: 3*/ }} />
      <Screen name='Contacts' component={Contacts} options={{title: 'Contatos'}} />
      <Screen name='Config' component={Config} options={{title: 'Configurações'}} />
    </Navigator>
  )
}

export default TabRoutes