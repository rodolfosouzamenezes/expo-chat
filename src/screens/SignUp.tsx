import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, ScrollViewComponent, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useController, useForm } from "react-hook-form";
import { getDatabase, ref, set } from "firebase/database";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { auth, createUserWithEmailAndPassword, firebase } from "../config/firebase";
import { showToast } from "../features/toast.slice";
import { useAppSelector } from "../store";
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
  const database = getDatabase(firebase);
  const [isLogging, setIsLogging] = useState(false)
  const { isLogged } = useAppSelector((state) => state.auth)
  const { control, handleSubmit, setFocus, formState: { errors, isValid } } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'all'
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = async ({ email, password, name }: FormData) => {
    setIsLogging(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        dispatch(login({
          name: name,
          email: user.email,
          uid: user.uid
        }))

        set(ref(database, 'users/' + user.uid), {
          name: name,
        })
      })
      .catch((error) => {
        setIsLogging(false)
        switch (error.code) {
          case 'auth/email-already-in-use':
            dispatch(showToast({ message: 'Já existe uma conta com este email!', type: 'error' }))
            break
          case 'auth/invalid-email':
            dispatch(showToast({ message: 'Email inválido!', type: 'error' }))
            break
          case 'auth/operation-not-allowed':
            dispatch(showToast({ message: 'Tente novamente mais tarde!', type: 'error' }))
            break
          case 'auth/weak-password':
            dispatch(showToast({ message: 'Senha muito fraca!\nA senha deve ter no mínimo 6 caracteres', type: 'error' }))
            break
          case 'auth/missing-email':
            dispatch(showToast({ message: 'Insira um email!', type: 'error' }))
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