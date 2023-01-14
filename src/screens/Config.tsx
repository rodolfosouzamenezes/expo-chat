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
  const toast = useAppSelector((state) => state.toast)
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
      <Text style={styles.title}>UID: {user.uid}</Text>
      <Button title="Sair" onPress={handleLogOut} />
      <Button title="Toast" onPress={() => dispatch(showToast({message: 'olsdad', type: 'success'}))} />
      <Button title="Toast" onPress={() => dispatch(showToast({message: 'olsdad', type: 'default'}))} />
      <Button title="Toast" onPress={() => dispatch(showToast({message: 'olsdad', type: 'error'}))} />
      <Button title="Toast" onPress={() => dispatch(showToast({message: 'olsdad', type: 'info'}))} />
      <Button title="Toast" onPress={() => dispatch(showToast({message: 'olsdad', type: 'warn', iconName:'add'}))} />
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
    fontSize: 22
  }
})
