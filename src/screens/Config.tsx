import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { Button } from "../components/Button";
import { logout } from "../features/auth.slice";
import { showToast } from "../features/toast.slice";

export function Config() {
  const { isLogged, user } = useAppSelector((state) => state.auth)
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

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Text style={styles.title}>Nome: {user.name}</Text>
        <Text style={styles.title}>Email: {user.email}</Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>UID: {user.uid}</Text>
      </View>
      <Button title="Sair" onPress={handleLogOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    
  }
})
