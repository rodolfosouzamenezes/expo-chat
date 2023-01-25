import { signInWithEmailAndPassword, User } from "firebase/auth/react-native";
import { collection, doc, getDoc } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as yup from "yup";

import { showToast } from "../features/toast.slice";
import { login } from "../features/auth.slice";
import { auth, db } from "../config/firebase";

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
    .email("O email deve ser válido")
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Este campo é obrigatório"),
}).required();

export function SignIn() {
  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const [isLogging, setIsLogging] = useState(false)
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

  const handleSignIn = async ({ email, password }: FormData) => {
    setIsLogging(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;

        setUser(user)
      })
      .catch(error => {
        const errorMessages = {
          "auth/user-disabled": 'Usuário desabilitado!',
          "auth/invalid-email": 'Email e/ou senha inválidos!',
          "auth/wrong-password": 'Email e/ou senha inválidos!',
          "auth/user-not-found": 'Email e/ou senha inválidos!',
        }

        const errorMessage = errorMessages[error.code] || 'Ops! Ocorreu algum erro!';
        dispatch(showToast({ message: errorMessage, type: 'error' }))
        console.log('error code:', error.code, '| message:', error.message);
      })
      .finally(() => setIsLogging(false))
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Input
          autoFocus
          name="email"
          title="Email"
          placeholder="Insira seu email"
          control={control}
          returnKeyType='next'
        />
        <Input
          name="password"
          title="Senha"
          placeholder="Insira sua senha"
          control={control}
          secureTextEntry
          returnKeyType='send'
        />
      </View>
      <Button
        title="Enviar"
        onPress={handleSubmit(handleSignIn)}
        isDisabled={!isValid}
        isLoading={isLogging}
        style={{
          marginVertical: 24,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputArea: {
    width: '100%',
  },
  buttonArea: {
    paddingHorizontal: 24,
    marginBottom: 24,
    width: '100%',
  }
})