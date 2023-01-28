import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useLayoutEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { IMessage } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { Message } from "./Message";

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const flatListRef = useRef<FlatList<IMessage>>(null);
  
  // Get states in redux
  const {
    chat: { activeChat },
  } = useAppSelector((state) => state);

  const messageCollection = collection(db, 'chats', activeChat?.id.toString(), 'messages');

  // Add listener for new message
  useLayoutEffect(() => {
    if (activeChat.id) {
      const messagesSortedByDateRef = query(messageCollection, orderBy("date", "desc"))
      const unsubscribe = onSnapshot(messagesSortedByDateRef, snapshot => {

        // Format messageSnapshot to IMessage
        const dataMessages: IMessage[] = snapshot.docs.map(doc => {
          const { senderId, message, date } = doc.data();

          // Check if the date exists before trying to access the "toDate()" method
          const timestampToDate = doc.data() && doc.data().date && date.toDate();

          return {
            id: doc.id,
            senderId,
            message,
            date: timestampToDate,
          }
        })

        if (dataMessages) {
          setMessages(dataMessages)

          // Scroll the flat list to the top when you get a new message
          flatListRef?.current.scrollToIndex({ index: 0, animated: true })
        }
      })

      return unsubscribe;
    }
  }, [])

  return (
    <FlatList
      data={messages}
      renderItem={({ item, index }) => <Message key={index} data={item} />}
      inverted
      ref={flatListRef}
      style={styles.chatList}
      contentContainerStyle={styles.contentChatList}
    />
  )
}

const styles = StyleSheet.create({
  chatList: {
    flex: 1,
    paddingTop: 20,
  },
  contentChatList: {
    paddingBottom: 80,
  }
})