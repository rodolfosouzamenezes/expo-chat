import { StackActions, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { login } from "../features/auth.slice";
import { useAppSelector } from "../store";
import { auth, firebase } from "../config/firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth/react-native";

export function Preload() {
  const database = getDatabase(firebase);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user === null) {
        navigation.dispatch(
          StackActions.replace('Home')
        )
        return
      }
      
      get(ref(database, 'users/' + user.uid + '/name'))
      .then((response) => {
        const name = response.val() as string;
        const { uid, email } = user;

        dispatch(login({
          email: email,
          name: name,
          uid: uid
        }));
      })
      .finally(() => {
        navigation.dispatch(
          StackActions.replace('Tabs')
        )
      })
    })
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color='#0fa958' size={40} />
    </SafeAreaView>
  )
}