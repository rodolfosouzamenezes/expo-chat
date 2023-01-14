import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export interface IButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'filled' | 'linked';
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({ title, type = 'filled', style, isDisabled, isLoading, ...rest }: IButtonProps) {
  return (
    <TouchableOpacity
      disabled={isDisabled || isLoading}
      style={[
        styles.container,
        styles[`${type}Button`],
        style,
        (isDisabled || isLoading) && {opacity: 0.6} 
      ]}

      {...rest}
    >
      {
        isLoading ? 
        <ActivityIndicator color='#fff' size={20} />
        :
        <Text
          style={[
            styles.title,
            styles[`${type}Title`],
          ]}
        >
          {title}
        </Text>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 18,
    minHeight: 70,
    alignItems: 'center',
    justifyContent: 'center',
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
