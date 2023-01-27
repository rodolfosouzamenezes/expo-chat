import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

import { headerStyleTab } from '../styles/navigation';
import { useAppSelector } from '../store';

import ChatStackRoutes from './chatStack.routes';
import { Contacts } from '../screens/Contacts';
import { Config } from '../screens/Config';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRoutes = () => {
  const { chats } = useAppSelector((state) => state.chat)

  return (
    <Navigator
      initialRouteName='ChatList'
      screenOptions={{
        ...headerStyleTab,
        tabBarInactiveTintColor: '#989898',
        tabBarActiveTintColor: '#0fa958',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
        },
      }}
    >
      <Screen
        name='ChatStack'
        component={ChatStackRoutes}
        options={({ route }) => {
          // Hide tab bar in Chat screen
          const focusedRouteName = getFocusedRouteNameFromRoute(route)

          if (focusedRouteName === 'Chat') {
            return {
              headerShown: false,
              tabBarStyle: {
                display: 'none'
              },
            }
          }
          
          return {
            headerShown: false,
            tabBarBadge: chats.length,
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons name='chatbox' size={focused ? 32 : 28} color={color} />
              )
            },
          }
        }}
      />

      <Screen
        name='Contacts'
        component={Contacts}
        options={{
          title: 'Contatos',
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons name='people' size={focused ? 32 : 28} color={color} />
            )
          }
        }}
      />

      <Screen
        name='Config'
        component={Config}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons name='settings' size={focused ? 32 : 28} color={color} />
            )
          }
        }}
      />
    </Navigator>
  )
}

export default TabRoutes