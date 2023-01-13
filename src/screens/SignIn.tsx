import { Text, StyleSheet, View, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { useAppSelector } from "../store";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { changeUser } from "../features/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { auth, firebase } from "../config/firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const { isLogged } = useAppSelector((state) => state.auth.user)
  const { control, handleSubmit } = useForm<FormData>();
  const navigation = useNavigation();
  const database = getDatabase(firebase);
  const dispatch = useDispatch();

  const handleSignIn = ({ email, password }: FormData) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        get(ref(database, 'users/' + user.uid + '/name'))
          .then(name => {
            const userName = name.val() as string;
            dispatch(changeUser({
              email,
              name: userName,
              uid: user.uid,
            }))
          });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-disabled':
            console.log('message:', error.message);
            console.log('Usuário desabilitado')
            break
          case 'auth/invalid-email':
            console.log('message:', error.message);
            console.log('Email inválido')
            break
          case 'auth/wrong-password':
            console.log('message:', error.message);
            console.log('Email e/ou senha inválidos')
            break
          case 'auth/user-not-found':
            console.log('message:', error.message);
            console.log('Email e/ou senha inválidos')
            break
          default:
            console.log('error:', error.code);
            console.log('message:', error.message);
            break
        }
      });


  }
  useEffect(() => {
    if (isLogged) {
      Keyboard.dismiss()
      navigation.reset({
        index: 0,
        routes: [
          { name: 'Chats' },
        ],
      })
    }
  }, [isLogged])

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Input placeholder="Insira seu email" title="Email" name="email" control={control} />
        <Input placeholder="Insira sua senha" title="Senha" name="password" secureTextEntry control={control} />
      </View>
      <Button title="Enviar" onPress={handleSubmit(handleSignIn)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputArea: {
    width: '100%',
  },
})