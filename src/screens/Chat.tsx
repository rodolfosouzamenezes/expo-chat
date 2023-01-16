import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";

export function Chat() {
  const { activeChat } = useAppSelector((state) => state.chat)
  const navigation = useNavigation();
  const dispatch = useDispatch();  

  return (
    <View style={{flex: 1,}}>
      <Text style={styles.title}>Chat ativo: {activeChat}</Text>
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
