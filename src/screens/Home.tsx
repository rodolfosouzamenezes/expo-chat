import { Text, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";

export function Home() {
  const navigation = useNavigation();
  const chatLogo = require('../assets/chat-logo.png');

  const handleSigIn = () => {
    navigation.navigate('SignIn')
  }
  const handleSignUp = () => {
    navigation.navigate('SignUp')

  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={chatLogo}
          resizeMode={'cover'} style={{ width: 200, height: 200 }} />
        <Text style={styles.title}>Chat</Text>
      </View>

      <View style={styles.box}>
        <Button title="Entrar" onPress={handleSigIn} style={{ marginBottom: 16}}/>
        <Button title="Cadastrar" onPress={handleSignUp} type="linked" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 32,
    color: '#0fa958',
    fontWeight: 'bold',
  },
})