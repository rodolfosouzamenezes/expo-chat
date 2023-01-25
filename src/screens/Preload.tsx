import { StackActions, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { collection, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { User } from "firebase/auth";
import { useEffect } from "react";

import { auth, db } from "../config/firebase";
import { login } from "../features/auth.slice";
import { onAuthStateChanged } from "firebase/auth/react-native";

export function Preload() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setUser = async (user: User) => {
    const userCollectionRef = collection(db, "users")
    const data = await getDoc(doc(userCollectionRef, user.uid))

    dispatch(login({
      uid: user.uid,
      email: user.email,
      name: data.data().name,
    }));
  }


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user === null) {
        navigation.dispatch(
          StackActions.replace('Home')
        )
        return
      }

      setUser(user);

      navigation.dispatch(
        StackActions.replace('Tabs')
      )
    })
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color='#0fa958' size={40} />
    </SafeAreaView>
  )
}