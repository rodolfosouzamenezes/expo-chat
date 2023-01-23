import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { IContact } from "../features/chat.slice";

interface IContactItemProps {
  data: IContact;
  onPress: (user: IContact) => void;
}

export function ContactItem({data, onPress}: IContactItemProps) {
  return (
    <TouchableHighlight underlayColor='#DDDDDD' onPress={() => onPress(data)} style={styles.container}>
      <Text style={styles.userName}>{data.name}</Text>
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