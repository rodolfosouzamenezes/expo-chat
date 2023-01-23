import React, { useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { get, getDatabase, push, ref, orderByChild, query, child, set, update } from "firebase/database";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { IContact, setActiveChat, setContacts } from "../features/chat.slice";
import { firebase } from "../config/firebase";
import { useAppSelector } from "../store";

import { ContactItem } from "../components/ContactItem";

export function Contacts() {
  const { contacts } = useAppSelector((state) => state.chat)
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
    const newChat = await push(ref(database, 'chats/'));
    const newChatId = newChat.key;

    // Create a new chat
    await set(newChat, {  
      members: {
        [user.uid]: { id: user.uid,},
        [contact.id]: { id: contact.id }
      }
    })

    // Linking users with chat
    await update(child(ref(database), `users/${user.uid}/chats/`), {
      [newChatId]: { id: newChatId, title: contact.name }
    })
    await update(child(ref(database), `users/${contact.id}/chats/`), {
      [newChatId]: { id: newChatId, title: contact.name }
    })

    dispatch(setActiveChat(newChatId))
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
