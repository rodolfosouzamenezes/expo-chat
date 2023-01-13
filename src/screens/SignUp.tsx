import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { useAppSelector } from "../store";
import { Input } from "../components/Input";
import { useForm } from "react-hook-form";
import { changeUid, signUp } from "../features/auth.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUp() {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = ({email, password, name }: FormData) => {
    dispatch(signUp({
      name,
      email,
      password,
    }))
    dispatch(changeUid(name))

    navigation.navigate('Chats')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <Input placeholder="Insira seu nome" title="Nome" name="name" control={control} />
        <Input placeholder="Insira seu email" title="Email" name="email" control={control} />
        <Input placeholder="Insira sua senha" title="Senha" name="password" secureTextEntry control={control} />
        <Input placeholder="Confirme a senha" title="Confirme a Senha" name="confirmPassword" secureTextEntry control={control} />
      </View>
      <Button title="Enviar" onPress={handleSubmit(handleSignUp)} />
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