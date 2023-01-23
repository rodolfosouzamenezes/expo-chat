import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { IChat } from "../features/chat.slice";

interface IChatItemProps {
  data: IChat;
  onPress: (id: string) => void;
}

export function ChatItem({data, onPress}: IChatItemProps) {
  return (
    <TouchableHighlight underlayColor='#DDDDDD' onPress={() => onPress(data.id)} style={styles.container}>
      <Text style={styles.userName}>{data.title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userName: {
    fontSize: 18,
  }
})