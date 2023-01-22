import React, { useCallback, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { get, getDatabase, push, ref, orderByChild, query, child, set, update } from "firebase/database";
import { firebase } from "../config/firebase";
import { IContact, setActiveChat, setContacts } from "../features/chat.slice";
import { ContactItem } from "../components/ContactItem";

export function Contacts() {
  const { contacts } = useAppSelector((state) => state.chat)
  const { uid } = useAppSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const database = getDatabase(firebase);
  const dispatch = useDispatch();

  const getContacts = async () => {
    let contacts: IContact[] = [];

    const que = query(ref(database, 'users'), orderByChild('name'))

    await get(que)
      .then((usersResponse) => {
        usersResponse.forEach((user) => {
          const name = user.val().name as string;
          const id = user.key;

          id !== uid &&
            contacts.push({ name, id })
        })
      });

    contacts.sort((a, b) => {
      var nameA = a.name.toUpperCase(); 
      var nameB = b.name.toUpperCase(); 
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

  const handleContactPress = async (id: string) => {
    const newChat = await push(ref(database, 'chats/'));
    const newChatId = newChat.key;
    set(newChat, {  
      members: {
        [uid]: { id: uid,},
        [id]: { id }
      }
    })

    update(child(ref(database), `users/${uid}/chats/`), {
      [newChatId]: { id: newChatId }
    })
    update(child(ref(database), `users/${id}/chats/`), {
      [newChatId]: { id: newChatId }
    })

    dispatch(setActiveChat({ chatId: newChatId }))

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
