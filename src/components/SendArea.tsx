import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

interface SendAreaProps {
  onSendMessage: (textMessage: string) => Promise<void>;
}

export function SendArea({ onSendMessage }: SendAreaProps) {
  const [textInput, setTextInput] = useState('')

  const handleSendMessage = () => {
    // Return if is an empty message
    if (textInput.trim().length === 0) return;

    onSendMessage(textInput)

    setTextInput('')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ android: null, ios: 'padding' })}
      keyboardVerticalOffset={Platform.select({ android: null, ios: 64 })}
      style={styles.sendArea}
    >
      <TextInput
        onChangeText={setTextInput}
        value={textInput}
        style={styles.sendInput}
      />
      <TouchableOpacity
        onPress={handleSendMessage}
        style={styles.sendButton}
        activeOpacity={0.7}
      >
        <Ionicons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  sendArea: {
    height: 54,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendInput: {
    flex: 1,
    height: 40,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#CACACA',
  },
  sendButton: {
    width: 46,
    height: 46,
    marginLeft: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0fa958'
  }
})
