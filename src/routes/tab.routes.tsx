import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatList } from '../screens/ChatList';
import { Config } from '../screens/Config';
import { Contacts } from '../screens/Contacts';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Navigator initialRouteName='ChatList' >
      <Screen name='ChatList' component={ChatList} options={{title: 'Conversas'/*, tabBarBadge: 3*/ }} />
      <Screen name='Contacts' component={Contacts} options={{title: 'Contatos'}} />
      <Screen name='Config' component={Config} options={{title: 'Configurações'}} />
    </Navigator>
  )
}

export default TabRoutes