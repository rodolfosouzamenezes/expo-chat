import { Text, TextInput, TextInputProps, View, TouchableOpacity } from "react-native";
import { Control, Controller, ControllerProps } from 'react-hook-form';
import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons/';

export interface IInputProps extends TextInputProps {
  title: string;
  placeholder: string;
  control: Control<any>;
  name: ControllerProps['name'];
  rules?: ControllerProps['rules'];
};

export function Input({ placeholder, title, name, control, rules, secureTextEntry = false, ...rest }: IInputProps) {
  const [textIsSecret, setTextIsSecret] = useState(secureTextEntry);
  return (
    <View style={styles.container}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <View>
            <Text style={styles.title}>{title}</Text>
            <TextInput style={styles.input}
              placeholder={placeholder}
              value={value}
              secureTextEntry={textIsSecret}
              onChangeText={onChange}
              onBlur={onBlur}
              underlineColorAndroid='transparent'
              placeholderTextColor='#868585'
              cursorColor='#0fa958'
              selectionColor='#0b7e408d'

              {...rest}
            />

            {error && <Text style={styles.errorMessage}>{error.message || 'Ops! Algo deu errado'}</Text>}
          </View>
        )}

        {...rest}
      />

      {
        secureTextEntry &&
        <TouchableOpacity onPress={() => setTextIsSecret(!textIsSecret)} style={styles.passwordButton}>
          <Ionicons size={22} name={textIsSecret ? 'eye' : 'eye-off'} />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10
  },
  title: {
    fontSize: 16,
    color: '#0fa958',
  },
  input: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 4,
    fontSize: 12,
    color: '#585555',
  },
  passwordButton: {
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 42,
    zIndex: 30,
    right: 0,
    top: 0,
  },
})