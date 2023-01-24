import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IContact {
  id: string;
  name: string;
}

export interface IChat {
  id: string;
  title: string;
  recipientId: string;
}

interface IChatState {
  chats: IChat[];
  contacts: IContact[];
  activeChat: IChat;
}

const initialState: IChatState = {
  chats: [],
  contacts: [],
  activeChat: {
    id: null,
    title: null,
    recipientId: null,
  },
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setContacts: (state = initialState, action: PayloadAction<IContact[]>) => {
      state.contacts = [...action.payload]
    },
    setChats: (state = initialState, action: PayloadAction<IChat[]>) => {
      state.chats = [...action.payload]
    },
    setActiveChat: (state = initialState, action: PayloadAction<string>) => {
      const activeChat = state.chats.find(chat => chat.id === action.payload)
        
      state.activeChat= activeChat || initialState.activeChat
    },
  }
})

export const { setContacts, setChats, setActiveChat } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
