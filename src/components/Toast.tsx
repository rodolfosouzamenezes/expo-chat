import { useEffect, useState } from "react";
import { Animated, Easing, Platform, TouchableWithoutFeedback, useColorScheme, View, StyleSheet, Dimensions, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store";
import { hideToast } from "../features/toast.slice";

const colors = {
  success: '#339900',
  error: '#d32f2f',
  warn: '#f57c00',
  info: '#1285f1',
  default: '#817f7f',
}

type IconNameKeys = {[type: string]: keyof typeof Ionicons.glyphMap}

const iconName: IconNameKeys= {
  success: 'checkmark-circle-outline',
  error: 'close-circle-outline',
  warn: 'alert-circle-outline',
  info: 'alert-circle-outline',
  default: 'information-circle-outline',
}
const { width } = Dimensions.get('window')
var timer = null;

export function Toast() {
  const deviceTheme = useColorScheme();
  const [statusBarStyle, setStatusBarStyle] = useState<'dark' | 'light'>('light');
  const [position] = useState(new Animated.Value(-(Constants.statusBarHeight + 60)));
  const toastState = useAppSelector((state) => state.toast)
  const dispatch = useDispatch();

  const zIndex = (value: number) => {
    return Platform.select({
      ios: { zIndex: value },
      android: { elevation: value }
    })
  }

  const show = () => {
    clearTimeout(timer)
    setStatusBarStyle('light')
    Animated.timing(position, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start();

    timer = setTimeout(() => {
      hide()
      setStatusBarStyle('light')
    }, toastState.duration)
  }

  const hide = () => {
    Animated.timing(position, {
      toValue: -(Constants.statusBarHeight + 60),
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => {
      dispatch(hideToast())
    });
  }

  useEffect(() => {
    toastState.show && show();
  }, [toastState])

  return (
    <View style={{ ...zIndex(100) }}>
      <StatusBar style={statusBarStyle} translucent />
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.default, { backgroundColor: colors[toastState.type], transform:[{translateY: position}] }]}>
          <View style={styles.messageContainer}>
            <Ionicons name={toastState.iconName || iconName[toastState.type]} color='white' size={26} />
            <Text style={styles.message}>{toastState?.message}</Text>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  default: {
    position: 'absolute',
    width,
    paddingHorizontal: 6,
    paddingBottom: 20,
    paddingTop: Constants.statusBarHeight + 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 16,
  }
})