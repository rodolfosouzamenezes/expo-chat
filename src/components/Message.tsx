import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../store";

interface MessageProps {
  data: {
    id: string;
    uid: string;
    date: string;
    message: string;
  }
}

export function Message({ data: { id, message, uid, date } }: MessageProps) {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <View
      style={[
        styles.messageArea,
        user.uid === uid ? styles.senderMessage : styles.recipientMessage
      ]}>
      <Text style={user.uid === uid ? styles.senderText : styles.recipientText}>{message}</Text>
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
    backgroundColor: '#c2dacc',
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
