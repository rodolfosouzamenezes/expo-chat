import { addDoc, serverTimestamp, onSnapshot, orderBy, query, collection } from "firebase/firestore";
import { StyleSheet, View, BackHandler, FlatList, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";

import { IMessage, setActiveChat } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { Message } from "../components/Message";
import { showToast } from "../features/toast.slice";

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [textInput, setTextInput] = useState('')

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get states in redux
  const {
    chat: { activeChat },
    auth: { user },
  } = useAppSelector((state) => state);

  const messageCollection = collection(db, 'chats', activeChat.id.toString(), 'messages');

  const sendMessage = async () => {
    // Return if is an empty message
    if (textInput.trim().length === 0) return;

    try {
      // Add new message to collection
      await addDoc(messageCollection, {
        date: serverTimestamp(), // Get timestamp in firebase server
        message: textInput,
        senderId: user.uid
      });
      setTextInput('')
    } catch (error) {
      console.log(error);
      dispatch(showToast({ message: 'Ops! Não foi possivel enviar a mensagem', type: 'error' }))
    }
  }

  // Add listener for new message
  useLayoutEffect(() => {
    if (activeChat.id) {
      const messagesSortedByDateRef = query(messageCollection, orderBy("date", "asc"))
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
        }
      })

      return unsubscribe;
    }
  }, [])

  // Clear ActiveChat on press Back Button
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
        data={messages}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item, index }) => <Message key={index} data={item} />}
        style={styles.chatArea}
      />
      <View style={styles.sendArea}>
        <TextInput
          onChangeText={setTextInput}
          value={textInput}
          style={styles.sendInput}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendButton}
          activeOpacity={0.7}
        >
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
