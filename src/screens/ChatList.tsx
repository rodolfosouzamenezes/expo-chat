import React, { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { Button } from "../components/Button";
import { logout } from "../features/auth.slice";

export function ChatList() {
  const { isLogged, user } = useAppSelector((state) => state.auth)
  const { activeChat } = useAppSelector((state) => state.chat)
  const navigation = useNavigation();
  const dispatch = useDispatch();  

  const handleLogOut = () => {
    dispatch(logout())
    
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Home' },
      ],
    })
  }

  useEffect(() => {
    activeChat !== null && navigation.navigate('Chat')
  }, [activeChat])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuário logado: {user.name}</Text>
      <Button title="Sair" onPress={handleLogOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  }, 
  title: {
    marginTop: 250,
    fontSize: 22
  }
})
