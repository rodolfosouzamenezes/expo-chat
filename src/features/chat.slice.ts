import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IContact {
  id: string;
  name: string;
}

interface IChatState {
  chats: string[];
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
    setChats: (state = initialState, action: PayloadAction<string[]>) => {
      state.chats = [...action.payload]
    },
    setActiveChat: (state = initialState, action: PayloadAction<{ chatId: string | null }>) => {
      state.activeChat = action.payload.chatId
    },
  }
})

export const { setContacts, setChats, setActiveChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
