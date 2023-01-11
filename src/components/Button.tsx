import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface IButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'filled' | 'linked';
}

export function Button({ title, type = 'filled', style, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styles[`${type}Button`],
        style,
      ]}

      {...rest}
    >
      <Text
        style={[
          styles.title,
          styles[`${type}Title`],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 18,
    alignItems: 'center',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  filledButton: {
    backgroundColor: '#0fa958',
    elevation: 6,
  },
  linkedButton: {
    backgroundColor: 'transparent',
  },
  filledTitle: {
    color: 'white',
  },
  linkedTitle: {
    color: '#0fa958',
  }
})
