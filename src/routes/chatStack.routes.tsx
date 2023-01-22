import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Chat } from '../screens/Chat';
import { ChatList } from '../screens/ChatList';

const { Screen, Navigator } = createNativeStackNavigator();

const ChatStackRoutes = () => {
  return (
    <Navigator
      initialRouteName='ChatList'
      screenOptions={{
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#0fa958',
        },
        animation: 'fade_from_bottom',
      }}>
      <Screen name="ChatList" component={ChatList} options={{ headerShown: true, title: 'Conversas',  }} />
      <Screen name="Chat" component={Chat} options={{ headerShown: true, title: 'Privado' }} />
    </Navigator>
  )
}

export default ChatStackRoutes
