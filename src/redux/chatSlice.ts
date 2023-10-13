import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../types/users";

interface ChatState {
  user: User | null;
  selectedChat: unknown;
  chats: unknown;
}

interface User {}
const initialState: ChatState = {
  user: null,
  selectedChat: null,
  chats: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProps[]>) => {
      state.user = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<unknown>) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action: PayloadAction<unknown>) => {
      state.chats = action.payload;
    },
  },
});

export const { setUser, setSelectedChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;
