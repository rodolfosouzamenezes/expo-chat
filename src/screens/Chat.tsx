import React, { useEffect } from "react";
import { Text, StyleSheet, View, BackHandler, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import { useAppSelector } from "../store";
import { setActiveChat } from "../features/chat.slice";
import { Message } from "../components/Message";

export function Chat() {
  const { activeChat } = useAppSelector((state) => state.chat)
  const navigation = useNavigation();
  const dispatch = useDispatch();  

  useEffect(() => {
    const handleBackButton = () => {
      dispatch(setActiveChat(null));
      navigation.navigate('ChatList')

      return true;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove()
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {id: '1', uid: '123', date: '2023-01-25T00:00:03.291Z',  message: 'Oiii' }, 
          {id: '2', uid: '123', date: '2023-01-25T00:01:03.291Z', message: 'Tudo bemm?'},
          {id: '3', uid: 'is6NWbciklRjtsneRB8JEV6AUhE2', date: '2023-01-25T00:04:03.291Z', message: 'oi'.repeat(50)},
          {id: '4', uid: '123', date: '2023-01-25T01:06:03.291Z', message: 'oi'.repeat(50)},
        ]}
        renderItem={({ item, index }) => <Message key={index} data={item} />}
        style={styles.chatArea}
      />
      <View style={styles.sendArea}>
        <TextInput
          style={styles.sendInput}
        />
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.7}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    paddingTop: 20, 
  },
  sendArea: {
    height: 54,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendInput: {
    flex: 1,
    height: 40,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#CACACA',
  },
  sendButton: {
    width: 46,
    height: 46,
    marginLeft: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0fa958'
  }
})
