import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { StyleSheet, View, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import { setActiveChat } from "../features/chat.slice";
import { showToast } from "../features/toast.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { MessageList } from "../components/MessageList";
import { SendArea } from "../components/SendArea";

export function Chat() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get states in redux
  const {
    chat: { activeChat },
    auth: { user },
  } = useAppSelector((state) => state);

  const messageCollection = collection(db, 'chats', activeChat?.id.toString(), 'messages');

  const handleSendMessage = async (textMessage: string) => {
    try {
      // Add new message to collection
      await addDoc(messageCollection, {
        date: serverTimestamp(), // Get timestamp in firebase server
        message: textMessage,
        senderId: user.uid
      });
    } catch (error) {
      console.log(error);
      dispatch(showToast({ message: 'Ops! Não foi possivel enviar a mensagem', type: 'error' }))
    }
  }

  // Clear ActiveChat on press Back Button
  useEffect(() => {
    const handleBackButton = () => {
      navigation.navigate('ChatList')
      dispatch(setActiveChat(null));

      return true;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove()
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MessageList />

      <SendArea onSendMessage={handleSendMessage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
