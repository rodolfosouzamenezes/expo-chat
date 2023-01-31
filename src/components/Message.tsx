import dayjs from "dayjs";
import { StyleSheet, Text, View, Image } from "react-native";
import { IMessage } from "../features/chat.slice";
import { useAppSelector } from "../store";
import { Loading } from "./Loading";

interface MessageProps {
  type: 'text' | 'image';
  data: IMessage
}

export function Message({ data: { id, text, senderId, date, src }, type }: MessageProps) {
  const { user } = useAppSelector((state) => state.auth)
  const formattedTime = dayjs(date).format('HH:mm');

  // Verify if the date doesn't match
  if (date === null) return <View />

  return (
    <View
      style={[
        styles.messageArea,
        user.uid === senderId ? styles.senderMessage : styles.recipientMessage
      ]}
    >
      {
        type === 'image' && (src ?
          <Image source={{ uri: src }} style={styles.image} />
          : (
            <View style={[styles.image, styles.loadingImage]}>
              <Loading />
            </View>
          )
        )
      }
      {text && <Text style={user.uid === senderId ? styles.senderText : styles.recipientText}>{text}</Text>}
      <Text style={styles.date}>{formattedTime}</Text>
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
  image: {
    height: 300,
    width: 300,
    borderRadius: 10,
    marginBottom: 8,
    resizeMode: 'cover'
  },
  loadingImage: {
    backgroundColor: '#fff',
    opacity: .5, 
    justifyContent: 'center',
  },
  date: {
    textAlign: 'right',
    fontSize: 12,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: '#a5e4c1',
  },
  recipientMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
    backgroundColor: '#ffffff',
  },
  senderText: {
    textAlign: 'right',
  },
  recipientText: {
    textAlign: 'left',
  }
})
