import { addDoc, arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { IContact, setActiveChat, setChats, setContacts } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { db } from "../config/firebase";

import { ContactItem } from "../components/ContactItem";

export function Contacts() {
  const { contacts, chats } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.auth)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fetchContacts = async () => {
    try {
      // Get contacts in the database
      const usersRef = collection(db, "users")
      const usersQuery = query(usersRef, orderBy("name"));
      const usersSnapshot = await getDocs(usersQuery)

      // Handling data to save contacts.
      let contactsData: IContact[] = [];
      usersSnapshot.forEach((doc) => {
        // Remove current user
        if (doc.id === user.uid) return

        contactsData.push({
          id: doc.id,
          name: doc.data().name as string,
        })
      })

      dispatch(setContacts(contactsData))
    } catch (error) {
      console.log(error)
    }
  }

  const handleContactPress = async (contact: IContact) => {
    try {
      let chatWithThisUser = chats.find(chat => chat.recipientId === contact.id);

      if (!chatWithThisUser) {
        // Generates a new chat
        const chatsRef = collection(db, "chats")
        const newChat = await addDoc(chatsRef, {
          members: {
            [user.uid]: { id: user.uid, },
            [contact.id]: { id: contact.id },
          }
        });
        // Get chat unique key
        const newChatId = newChat.id;

        // Linking users with chat
        const usersRef = collection(db, "users")
        const newChats = [
          { id: newChatId, title: contact.name, recipientId: contact.id }, 
          { id: newChatId, title: user.name, recipientId: user.uid }
        ]

        await Promise.all([
          updateDoc(doc(usersRef, user.uid.toString()), { chats: arrayUnion(newChats[0]) }),
          updateDoc(doc(usersRef, contact.id.toString()), { chats: arrayUnion(newChats[1]) }),
        ]);

        chatWithThisUser = newChats[0]
        dispatch(setChats([...chats, chatWithThisUser]))
      }

      dispatch(setActiveChat(chatWithThisUser.id))
      navigation.navigate('ChatStack')
    } catch (error) {
      console.log(error)
    } 
  }

  useFocusEffect(useCallback(() => {
    fetchContacts()
  }, [user.uid]))

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return <ContactItem data={item} onPress={handleContactPress} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
