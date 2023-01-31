import { addDoc, serverTimestamp, collection, updateDoc, doc } from "firebase/firestore";
import { StyleSheet, View, BackHandler, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { useDispatch } from "react-redux";

import { setActiveChat } from "../features/chat.slice";
import { showToast } from "../features/toast.slice";
import { useAppSelector } from "../store";
import { db, storage } from "../config/firebase";

import { MessageList } from "../components/MessageList";
import { SendArea } from "../components/SendArea";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function Chat() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Get states in redux
  const {
    chat: { activeChat },
    auth: { user },
  } = useAppSelector((state) => state);

  const messageCollection = collection(db, 'chats', activeChat?.id.toString(), 'messages');

  const pickImage = async () => {
    const { assets, canceled } = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!canceled) {
      const { uri } = assets[0];

      return uri;
    }

    return false;
  }

  const uploadImage = async (imageUri: string, messageId: string) => {
    // Convert image to array of bytes
    const response = await fetch(imageUri);
    const blob = await response.blob();

    const storageRef = ref(storage, `/images/${messageId}`)
    const uploadTask = await uploadBytesResumable(storageRef, blob)

    // uploadTask
    //   .on('state_changed',
    //     snapshot => {
    //       const transferredProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     })

    const urlImage = await getDownloadURL(uploadTask.ref)
    return { urlImage }
  }


  const handleSendMessage = async (type: 'text' | 'image', textMessage?: string) => {
    let messageData = {
      type,
      date: serverTimestamp(), // Get timestamp in firebase server
      senderId: user.uid,
    };

    if (textMessage) {
      messageData["text"] = textMessage
    }

    try {
      // Add new message to collection
      const { id } = await addDoc(messageCollection, messageData);

      if (type === 'image') {
        const imageUri = await pickImage();
        if (!imageUri) return;

        const { urlImage } = await uploadImage(imageUri, id);

        const newMessageDoc = doc(messageCollection, id);

        await updateDoc(newMessageDoc, {
          src: urlImage,
        }) 
      }
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
