import React, { useCallback, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../store";
import { get, getDatabase, ref } from "firebase/database";
import { firebase } from "../config/firebase";
import { IContact, setContacts } from "../features/chat.slice";
import { ContactItem } from "../components/ContactItem";

export function Contacts() {
  const { contacts } = useAppSelector((state) => state.chat)
  const navigation = useNavigation();
  const database = getDatabase(firebase);
  const dispatch = useDispatch();

  const getContacts = async () => {
    let contacts: IContact[] = [];
    await get(ref(database, 'users/'))
      .then((usersResponse) => {
        usersResponse.forEach((user) => {
          const name = user.val().name as string;
          const id = user.key;
          contacts.push({ name, id })          
        })
      });

    dispatch(setContacts(contacts))
  }

  const handleContactPress = (id: string) => {
    console.log(id);   
  }

  useFocusEffect(useCallback(() => {
    getContacts()
  }, []))

  return (
    <View style={{ flex: 1, }}>
      <FlatList
        data={contacts}
        renderItem={({item}) => {
          return <ContactItem data={item} onPress={handleContactPress}/>
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
