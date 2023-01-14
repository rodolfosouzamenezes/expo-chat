import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ionicons } from '@expo/vector-icons';

type IIcon = keyof typeof Ionicons.glyphMap

interface IToastState {
  type: 'default' | 'info' | 'success' | 'warn' | 'error';
  message: string;
  duration: number;
  iconName: IIcon;
  show: boolean;
}

interface IToastPayload {
  type?: 'default' | 'info' | 'success' | 'warn' | 'error';
  message: string;
  duration?: number;
  iconName?: IIcon;
}

const initialState: IToastState = {
  type: null,
  message: null,
  duration: 4000,
  iconName: null,
  show: false,
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state = initialState, action: PayloadAction<IToastPayload>) => {
      state.type = action.payload.type || 'info'
      state.message = action.payload.message
      state.duration = action.payload.duration === undefined ? 4000 : action.payload.duration
      state.iconName = action.payload.iconName;
      state.show = true
    },
    hideToast: (state = initialState) => {
      state.type = initialState.type
      state.message = initialState.message
      state.duration = initialState.duration
      state.iconName = initialState.iconName
      state.show = false
    },
  }
})

export const { hideToast, showToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
