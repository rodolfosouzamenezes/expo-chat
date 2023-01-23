import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const headerStyle: NativeStackNavigationOptions = {
  headerShown: true,
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 22,
  },
  headerStyle: {
    backgroundColor: '#0fa958',
  },
}

export const headerStyleTab: BottomTabNavigationOptions = {
  headerShown: true,
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 22,
  },
  headerStyle: {
    backgroundColor: '#0fa958',
  },
}