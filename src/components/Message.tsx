import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { IMessage } from "../features/chat.slice";
import { useAppSelector } from "../store";

interface MessageProps {
  data: IMessage
}

export function Message({ data: { id, message, senderId, date } }: MessageProps) {
  const { user } = useAppSelector((state) => state.auth)

  // Verify if the date doesn't match
  if (date === null) {
    return <View></View>
  }

  return (
    <View
      style={[
        styles.messageArea,
        user.uid === senderId ? styles.senderMessage : styles.recipientMessage
      ]}>
      <Text style={user.uid === senderId ? styles.senderText : styles.recipientText}>{message}</Text>
       <Text style={styles.date}>{dayjs(date).format('HH:mm')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  messageArea: {
    maxWidth: '88%',
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  date: {
    textAlign: 'right',
    fontSize: 12,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#cbcecc',
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    backgroundColor: '#a8dbbf',
  },
  senderText: {
    textAlign: 'right',
  },
  recipientText: {
    textAlign: 'left',
  }
})
