import { Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";

export function Chats() {
  const { isLogged } = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Text>Chats: {String(isLogged)}</Text>
    </SafeAreaView>
  )
}