import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../types/users";

interface ChatState {
  user: User | null;
  selectedChat: unknown;
  chats: unknown;
  allUsers: unknown;
  notification: unknown;
}

interface User {}
const initialState: ChatState = {
  user: null,
  selectedChat: null,
  chats: null,
  allUsers: [],
  notification: [],
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
    setAllUsers: (state, action: PayloadAction<unknown>) => {
      state.allUsers = action.payload;
    },
    setNotification: (state, action: PayloadAction<unknown>) => {
      state.notification = action.payload;
    },
  },
});

export const { setUser, setSelectedChat, setChats, setAllUsers,setNotification } =
  chatSlice.actions;
export default chatSlice.reducer;
