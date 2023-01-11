import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";

export function Chats() {
  const { isLogged } = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text style={styles.title}>Chats: {String(isLogged)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }, 
  title: {
    fontSize: 22
  }
})
