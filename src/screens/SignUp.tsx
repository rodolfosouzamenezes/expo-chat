import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDatabase, ref, set } from "firebase/database";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebase } from "../config/firebaseConfig";
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
    .min(2, "No mínimo 2 caracteres")
    .required("Campo obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "No mínimo 6 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .min(6, "No mínimo 6 caracteres")
    .required("Campo obrigatório")
    .oneOf([yup.ref('password'), null], 'As senhas não conferem')
}).required();

export function SignUp() {
  const database = getDatabase(firebase);
  const [isLogging, setIsLogging] = useState(false)
  const { isLogged } = useAppSelector((state) => state.auth)
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
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
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Input placeholder="Insira seu nome" title="Nome" name="name" control={control} />

        <Input placeholder="Insira seu email" title="Email" name="email" control={control}/>
        <Input placeholder="Insira sua senha" title="Senha" name="password" secureTextEntry control={control}/>
        <Input placeholder="Confirme a senha" title="Confirme a Senha" name="confirmPassword" secureTextEntry control={control}/>
      </View>
      <Button title="Enviar" onPress={handleSubmit(handleSignUp)} isDisabled={!isValid} isLoading={isLogging}/>
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