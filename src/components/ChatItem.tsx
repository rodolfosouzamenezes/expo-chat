import { StyleSheet, Text, TouchableHighlight } from "react-native";

interface IChatItemProps {
  data: string;
  onPress: (id: string) => void;
}

export function ChatItem({data, onPress}: IChatItemProps) {
  return (
    <TouchableHighlight underlayColor='#DDDDDD' onPress={() => onPress(data)} style={styles.container}>
      <Text style={styles.userName}>{data}</Text>
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