import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useLayoutEffect, useRef, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

import { IMessage } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { Message } from "./Message";
import dayjs from "dayjs";

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const flatListRef = useRef<FlatList<IMessage>>(null);

  // Get states in redux
  const {
    chat: { activeChat },
  } = useAppSelector((state) => state);

  const messageCollection = collection(db, 'chats', activeChat?.id.toString(), 'messages');

  function groupMessageByDays(messages: IMessage[]): (IMessage | string)[] {
    const groupedMessages = new Map<string, IMessage[]>();
    const today = dayjs().startOf('day')

    messages.forEach((message) => {
      const day = dayjs(message.date).startOf('day');
      const formatDay = dayjs(day).isSame(today, 'week') ? 'dddd' : 'LL';

      // Format Day Message
      const messageDay = dayjs(day).isSame(today) ? 'Hoje' : dayjs(day).format(formatDay)

      // If no entry for message date exists, creates new Map entry with empty array and adds message to it
      if (!groupedMessages.has(messageDay)) {
        groupedMessages.set(messageDay, []);
      }
      groupedMessages.get(messageDay)?.push(message);
    });

    // Transform to array
    const groupedMessagesArray: (IMessage | string)[] = [];
    groupedMessages.forEach((messages, date) => {
      groupedMessagesArray.push(...messages, date);
    });

    return groupedMessagesArray;
  }

  // Add listener for new message
  useLayoutEffect(() => {
    if (activeChat.id) {
      const messagesSortedByDateRef = query(messageCollection, orderBy("date", "desc"))
      const unsubscribe = onSnapshot(messagesSortedByDateRef, snapshot => {
        // Format messageSnapshot to IMessage
        const dataMessages: IMessage[] = snapshot.docs.map(doc => {
          const { senderId, text, date, type } = doc.data();

          // Check if the date exists before trying to access the "toDate()" method
          const timestampToDate = doc.data() && doc.data().date && date.toDate();

          if (type === 'image') {
            const { src } = doc.data();

            return {
              id: doc.id,
              senderId,
              src,
              text,
              type,
              date: timestampToDate,
            }
          }

          return {
            id: doc.id,
            senderId,
            text,
            type,
            date: timestampToDate,
          }
        })

        if (dataMessages) {
          setMessages((dataMessages))

          // Scroll the flat list to the top when you get a new message
          if (dataMessages.length > 0) {
            flatListRef?.current.scrollToIndex({ index: 0, animated: true })
          }
        }
      })      

      return unsubscribe;
    }
  }, [])

  return (
    <FlatList
      data={groupMessageByDays(messages)}
      renderItem={({ item, index }) => {
        if (typeof item === 'object') {
          return <Message type={item.type} key={index} data={item} />;
        }

        if (item !== 'Invalid Date') {
          return (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{item}</Text>
            </View>
          )
        }
      }}
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
    paddingVertical: 20,
  },
  dayContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dayText: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#e4e4e4',
    textTransform: 'capitalize'
  },
})