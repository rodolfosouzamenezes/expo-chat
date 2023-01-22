import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Config } from '../screens/Config';
import { Contacts } from '../screens/Contacts';
import ChatStackRoutes from './chatStack.routes';
import { Text } from 'react-native';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Navigator
      initialRouteName='ChatList'
      screenOptions={{
        headerShown: true,
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 22,
        },
        headerStyle: {
          backgroundColor: '#0fa958',
        },
        tabBarInactiveTintColor: '#989898',
        tabBarActiveTintColor: '#0fa958',
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 58,
        },
      }}>
      <Screen name='ChatStack' component={ChatStackRoutes} options={{
        title: 'Conversas',
        headerShown: false,
        tabBarBadge: 2,
        tabBarIcon: ({ focused, color }) => {
          return (
            <Ionicons name='chatbox' size={focused ? 32 : 28} color={color} />
          )
        },
      }} />
      <Screen name='Contacts' component={Contacts} options={{
        title: 'Contatos',
        tabBarIcon: ({ focused, color }) => {
          return (
            <Ionicons name='people' size={focused ? 32 : 28} color={color} />
          )
        }
      }} />
      <Screen name='Config' component={Config} options={{
        title: 'Configurações',
        tabBarIcon: ({ focused, color }) => {
          return (
            <Ionicons name='settings' size={focused ? 32 : 28} color={color} />
          )
        }
      }} />
    </Navigator>
  )
}

export default TabRoutes