import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Config } from '../screens/Config';
import { Contacts } from '../screens/Contacts';
import ChatStackRoutes from './chatStack.routes';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { headerStyleTab } from '../styles/navigation';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRoutes = () => {
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
          const focusedRouteName = getFocusedRouteNameFromRoute(route)

          return {
            headerShown: false,
            tabBarStyle: {
              display: focusedRouteName === 'Chat' ? 'none' : 'flex'
            },
            tabBarBadge: 2,
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