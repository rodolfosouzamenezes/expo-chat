import { StyleSheet, View, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { useAppSelector } from "../store";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { login } from "../features/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth/react-native";
import { auth, firebase } from "../config/firebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import { showToast } from "../features/toast.slice";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const { isLogged } = useAppSelector((state) => state.auth)
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
            dispatch(login({
              email,
              name: userName,
              uid: user.uid,
            }))
          })
          .catch(console.log)    
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-disabled':
            dispatch(showToast({ message: 'Usuário desabilitado!', type: 'error' }))
            break
          case 'auth/invalid-email':
            dispatch(showToast({ message: 'Email e/ou senha inválidos!', type: 'error' }))
            break
          case 'auth/wrong-password':
            dispatch(showToast({ message: 'Email e/ou senha inválidos!', type: 'error' }))
            break
          case 'auth/user-not-found':
            console.log('Email e/ou senha inválidos')
            break
          default:
            dispatch(showToast({ message: 'Ops! Ocorreu algum erro!', type: 'error' }))
            console.log('error code:', error.code, '| message:', error.message);
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
          { name: 'Tabs' },
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