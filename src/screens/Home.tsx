import { Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";

export function Home() {
  const { isLogged } = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView>
      <Text>Home: {String(isLogged)}</Text>
    </SafeAreaView>
  )
}