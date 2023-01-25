import { createUserWithEmailAndPassword, User } from "firebase/auth/react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as yup from "yup";

import { auth, db } from "../config/firebase";
import { showToast } from "../features/toast.slice";
import { login } from "../features/auth.slice";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues: FormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// Schema Validation 
const schema = yup.object({
  name: yup
    .string()
    .min(2, "Deve ter no mínimo 2 caracteres")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .email("O email deve ser válido")
    .trim()
    .required("Este campo é obrigatório"),
  password: yup
    .string()
    .min(6, "Deve ter no mínimo 6 caracteres")
    .required("Este campo é obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas não conferem')
}).required();

export function SignUp() {
  const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const [isLogging, setIsLogging] = useState(false)
  const dispatch = useDispatch();

  const setUser = async (user: User, name: string) => {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, { name })

    dispatch(login({
      uid: user.uid,
      email: user.email,
      name,
    }));
  }

  const handleSignUp = async ({ email, password, name }: FormData) => {
    setIsLogging(true)
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set user in Firestore and Redux
        setUser(user, name)
      })
      .catch((error) => {
        const errorMessages = {
          "auth/email-already-in-use": 'Já existe uma conta com este email!',
          "auth/invalid-email": 'Email inválido!',
          "auth/operation-not-allowed": 'Tente novamente mais tarde!',
          "auth/weak-password": 'Senha muito fraca!\nA senha deve ter no mínimo 6 caracteres',
          "auth/missing-email": 'Insira um email!',
        }

        const errorMessage = errorMessages[error.code] || 'Ops! Ocorreu algum erro!';

        dispatch(showToast({ message: errorMessage, type: 'error' }));
        console.log('error code:', error.code, '| message:', error.message);
      })
      .finally(() => setIsLogging(false))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputArea}>
        <Input
          autoFocus
          name="name"
          title="Nome"
          placeholder="Insira seu nome"
          control={control}
          returnKeyType='next'
          onSubmitEditing={() => console.log('email')}
        />

        <Input
          name="email"
          title="Email"
          placeholder="Insira seu email"
          control={control}
          keyboardType='email-address'
          returnKeyType='next'
        />

        <Input
          name="password"
          title="Senha"
          placeholder="Insira sua senha"
          control={control}
          secureTextEntry
          returnKeyType='next'
        />
        <Input
          name="confirmPassword"
          title="Confirme a senha"
          placeholder="Confirme a senha"
          control={control}
          secureTextEntry
          returnKeyType='send'
        />
      </View>
      <View style={styles.buttonArea}>
        <Button
          title="Enviar"
          onPress={handleSubmit(handleSignUp)}
          isDisabled={!isValid}
          isLoading={isLogging}
          style={{ alignSelf: 'flex-end' }}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputArea: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  buttonArea: {
    paddingHorizontal: 24,
    marginBottom: 24,
    width: '100%',
  }
})