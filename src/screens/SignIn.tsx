import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";

export function SignIn() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Text>SignIn</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  }
})