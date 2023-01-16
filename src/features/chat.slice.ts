import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IContact {
  id: string;
  name: string;
}

interface IChat {
  id: string;
}
interface IChatState {
  chats: IChat[];
  contacts: IContact[];
  activeChat: string;
}

const initialState: IChatState = {
  chats: [],
  contacts: [],
  activeChat: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setContacts: (state = initialState, action: PayloadAction<IContact[]>) => {
      state.contacts = [...action.payload]
    },
    setActiveChat: (state = initialState, action: PayloadAction<{ chatId: string }>) => {
      state.activeChat = action.payload.chatId
    },
  }
})

export const { setContacts, setActiveChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
