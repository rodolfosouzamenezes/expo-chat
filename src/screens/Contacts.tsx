import React, { useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { get, getDatabase, push, ref, orderByChild, query, child, set, update } from "firebase/database";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { IContact, setActiveChat, setChats, setContacts } from "../features/chat.slice";
import { firebase } from "../config/firebase";
import { useAppSelector } from "../store";

import { ContactItem } from "../components/ContactItem";

export function Contacts() {
  const { contacts, chats } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.auth)
  const navigation = useNavigation();
  const database = getDatabase(firebase);
  const dispatch = useDispatch();

  const getContacts = async () => {
    let contacts: IContact[] = [];

    const usersQuery = query(ref(database, 'users'), orderByChild('name'))

    await get(usersQuery)
      .then((usersResponse) => {
        usersResponse.forEach((contact) => {
          const name = contact.val().name as string;
          const id = contact.key;

          id !== user.uid &&
            contacts.push({ name, id })
        })
      });

    contacts.sort((contactA, contactB) => {
      var nameA = contactA.name.toUpperCase();
      var nameB = contactB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    })

    dispatch(setContacts(contacts))
  }

  const handleContactPress = async (contact: IContact) => {
    let chatWithThisUser = chats.find(chat => chat.recipientId === contact.id)

    if (!chatWithThisUser) {
      // Generates a new child unique key
      const newChat = await push(ref(database, 'chats/'));
      const newChatId = newChat.key;

      // Create a new chat
      await set(newChat, {
        members: {
          [user.uid]: { id: user.uid, },
          [contact.id]: { id: contact.id },
        }
      })

      // Linking users with chat
      await update(child(ref(database), `users/${user.uid}/chats/`), {
        [newChatId]: {
          id: newChatId,
          title: contact.name,
          recipientId: contact.id
        }
      })
      await update(child(ref(database), `users/${contact.id}/chats/`), {
        [newChatId]: {
          id: newChatId,
          title: contact.name,
          recipientId: user.uid
        }
      })

      chatWithThisUser = {
        id: newChatId,
        title: contact.name,
        recipientId: contact.id
      }
    }

    console.log(chatWithThisUser);
    
    dispatch(setChats([...chats, chatWithThisUser]))
    dispatch(setActiveChat(chatWithThisUser.id))
    navigation.navigate('ChatStack')
  }

  useFocusEffect(useCallback(() => {
    getContacts()
  }, []))

  return (
    <View style={{ flex: 1, }}>
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
    margin: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22
  }
})
