import { get, getDatabase, ref } from "firebase/database";
import { StyleSheet, View, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as yup from "yup";

import { auth, firebase, signInWithEmailAndPassword } from "../config/firebase";
import { useAppSelector } from "../store";
import { showToast } from "../features/toast.slice";

import { login } from "../features/auth.slice";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

type FormData = {
  email: string;
  password: string;
}

const defaultValues: FormData = {
  email: '',
  password: '',
}

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("E-mail inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "No mínimo 6 caracteres")
    .required("Campo obrigatório"),
}).required();

export function SignIn() {
  const { isLogged } = useAppSelector((state) => state.auth)
  const [isLogging, setIsLogging] = useState(false)
  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });
  const navigation = useNavigation();
  const database = getDatabase(firebase);
  const dispatch = useDispatch();

  const handleSignIn = ({ email, password }: FormData) => {
    setIsLogging(true)
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
        setIsLogging(false)
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
            dispatch(showToast({ message: 'Email e/ou senha inválidos!', type: 'error' }))
            break
          default:
            dispatch(showToast({ message: 'Ops! Ocorreu algum erro!', type: 'error' }))
            console.log('error code:', error.code, '| message:', error.message);
            break
        }
      })
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
      setTimeout(() => setIsLogging(false), 2000)
    }
  }, [isLogged])

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Input placeholder="Insira seu email" title="Email" name="email" control={control} />
        <Input placeholder="Insira sua senha" title="Senha" name="password" secureTextEntry control={control} />
      </View>
      <Button title="Enviar" onPress={handleSubmit(handleSignIn)} isDisabled={!isValid} isLoading={isLogging} />
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