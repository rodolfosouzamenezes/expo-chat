import { useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { checkLogin } from "../features/auth.slice";
import { useAppSelector } from "../store";

export function Preload() {
  const { isLogged } = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged === undefined) {
      dispatch(checkLogin())
    } else {
      navigation.dispatch(
        StackActions.replace(isLogged ? 'Chats' : 'Home')
      )
    }

  })
  
  return (
    <SafeAreaView>
      <Text>Is Logged: {String(isLogged)}</Text>
    </SafeAreaView>
  )
}