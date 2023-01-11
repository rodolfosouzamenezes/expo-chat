import React from 'react'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';

const Routes = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0fa958' }}>
      <NavigationContainer >
        <StackRoutes />
      </NavigationContainer>
    </View>
  )
}

export default Routes