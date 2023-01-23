import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { Chat } from '../screens/Chat';
import { ChatList } from '../screens/ChatList';
import { BackHandler, TouchableOpacity } from 'react-native';
import { headerStyle } from '../styles/navigation';
import { useDispatch } from 'react-redux';
import { setActiveChat } from '../features/chat.slice';
import { useNavigation } from '@react-navigation/native';

const { Screen, Navigator } = createNativeStackNavigator();

const ChatStackRoutes = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGoBack = () => {
    dispatch(setActiveChat({ chatId: null }));
    navigation.navigate('ChatList')
  }

  return (
    <Navigator
      initialRouteName='ChatList'
      screenOptions={{
        ...headerStyle,
        animation: 'fade_from_bottom'
      }}
    >

      <Screen
        name="ChatList"
        component={ChatList}
        options={{ title: 'Conversas' }}
      />

      <Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Privado',
          headerLeft({ tintColor, canGoBack }) {
            return (
              <TouchableOpacity
                onPress={() => {
                  canGoBack && handleGoBack()
                }}
              >
                <Ionicons name='arrow-back' size={30} color={tintColor} />
              </TouchableOpacity>
            )
          },
        }}
      />
    </Navigator>
  )
}

export default ChatStackRoutes
