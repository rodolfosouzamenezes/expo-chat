import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { StyleSheet, View, FlatList } from "react-native";
import { useDispatch } from "react-redux";

import { IChat, setActiveChat, setChats } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { ChatItem } from "../components/ChatItem";
import { Loading } from "../components/Loading";

export function ChatList() {
  const { activeChat, chats } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchChatList = async () => {
    try {
      setIsLoading(true)
      // Get chats in the database
      const chatsDocRef = collection(db, "users")
      const chatsSnapshot = await getDoc(doc(chatsDocRef, user.uid.toString()))

      const chatsData = chatsSnapshot?.data().chats as IChat[]

      // Set chats in Redux
      dispatch(setChats(chatsData || []))
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatSelect = (chatId: string) => {
    dispatch(setActiveChat(chatId));
  }

  // Fetch chat list on screen focus and change user id
  useFocusEffect(useCallback(() => {
    fetchChatList()
  }, [user.uid]));

  // Navigate to chat when selecting chat
  useEffect(() => {
    activeChat.id !== null && navigation.navigate('Chat')
  }, [activeChat])

  return (
    <View style={styles.container}>
      {
        isLoading ? <Loading /> :
          <FlatList
            style={styles.chatList}
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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatList: {
    flex: 1,
    width: '100%',
  }
})
