import React, { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { Button } from "../components/Button";

export function ChatList() {
  const { isLogged, user } = useAppSelector((state) => state.auth)
  const { activeChat } = useAppSelector((state) => state.chat)
  const navigation = useNavigation();
  const dispatch = useDispatch();  

  useEffect(() => {
    activeChat !== null && navigation.navigate('Chat')
  }, [activeChat])

  return (
    <View style={{flex: 1,}}>
      <Text style={styles.title}>Chats: {user.name}</Text>
      <Button title="Ir para conversas" onPress={() => navigation.navigate('Chat')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  title: {
    fontSize: 22
  }
})
