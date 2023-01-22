import React, { useCallback, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, FlatList, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { Button } from "../components/Button";
import { logout } from "../features/auth.slice";
import { get, getDatabase, ref } from "firebase/database";
import { firebase } from "../config/firebase";
import { setActiveChat, setChats } from "../features/chat.slice";
import { ChatItem } from "../components/ChatItem";
import { showToast } from "../features/toast.slice";

export function ChatList() {
  const { user } = useAppSelector((state) => state.auth)
  const { activeChat, chats } = useAppSelector((state) => state.chat)
  const database = getDatabase(firebase);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchChatList = async () => {
    try {
      const response = await get(ref(database, 'users/' + user.uid + '/chats'))
      const chats = response.val() as { [id: string]: { id: string } }
      const chatKeysArray = Object.keys(chats)

      dispatch(setChats(chatKeysArray))
    } catch (error) {
      console.log(error)
      dispatch(showToast({ message: 'Ops, não foi possível carregar os chats!', type: 'error' }))
    }
  }

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat({ chatId }));

  }

  useFocusEffect(useCallback(() => {
    fetchChatList()
  }, []));

  useEffect(() => {
    activeChat !== null && navigation.navigate('Chat')
  }, [activeChat])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={chats}
        renderItem={({ item, index }) => {
          return (
            <ChatItem
              key={`${index}-${item}`}
              data={item}
              onPress={() => handleChatSelect(item)}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 250,
    fontSize: 22
  }
})
