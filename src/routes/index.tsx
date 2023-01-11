import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const Routes = () => {
  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#0fa958' }}>
    <NavigationContainer >
      <StackRoutes />
    </NavigationContainer>
    // </SafeAreaView>
  )
}

export default Routes