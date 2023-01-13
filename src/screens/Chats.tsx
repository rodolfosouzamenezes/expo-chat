import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";

export function Chats() {
  const { isLogged, user } = useAppSelector((state) => state.auth)
  const navigation = useNavigation();
  const dispatch = useDispatch();  

  return (
    <View style={{flex: 1,}}>
      <Text style={styles.title}>Chats: {user.name}</Text>
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
