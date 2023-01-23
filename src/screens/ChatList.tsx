import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { get, getDatabase, ref } from "firebase/database";
import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setActiveChat, setChats } from "../features/chat.slice";
import { showToast } from "../features/toast.slice";
import { firebase } from "../config/firebase";
import { useAppSelector } from "../store";

import { ChatItem } from "../components/ChatItem";

export function ChatList() {
  const { user } = useAppSelector((state) => state.auth)
  const { activeChat, chats } = useAppSelector((state) => state.chat)
  const database = getDatabase(firebase);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchChatList = async () => {
    try {
      const response = await get(ref(database, 'users/' + user.uid + '/chats'))      
      const chats = response.val() as { [id: string]: { id: string, title: string, recipientId: string } }
      const chatKeysArray = Object.values(chats)      

      dispatch(setChats(chatKeysArray))
    } catch (error) {
      console.log(error)
      dispatch(showToast({ message: 'Ops, não foi possível carregar os chats!', type: 'error' }))
    }
  }

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));

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
              onPress={handleChatSelect}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginTop: 250,
    fontSize: 22
  }
})
