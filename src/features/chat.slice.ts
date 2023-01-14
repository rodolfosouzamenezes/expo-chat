import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IChatState {
  chats: IChat[];
  contacts: IContact[];
}

const initialState: IChatState = {
  chats: [],
  contacts: [],
}

export interface IContact {
  id: string;
  name: string;
}

interface IChat {
  id: string;
  name: string;
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setContacts: (state = initialState, action: PayloadAction<IContact[]>) => {
      state.contacts = [...action.payload]
    },
  }
})

export const { setContacts } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
