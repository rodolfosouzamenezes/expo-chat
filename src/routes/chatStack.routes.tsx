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
        animation: 'fade_from_bottom',
      }}>
      <Screen name="ChatList" component={ChatList} />
      <Screen name="Chat" component={Chat} options={{ headerShown: true, title: 'Entrar' }} />
    </Navigator>
  )
}

export default ChatStackRoutes
