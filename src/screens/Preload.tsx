import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function Preload() {
  const {status} = useSelector((state: RootState) => state.auth)
  console.log(status);
  
  return (
    <SafeAreaView>
      <Text>Loading: {status ? 'True' : 'False'}</Text>
    </SafeAreaView>
  )
}