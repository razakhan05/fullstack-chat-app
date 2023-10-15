import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { setSelectedChat } from "../redux/chatSlice";
import { ChatsType, UserProps } from "../types/users";

export const handleUpdate = async (
  selectedChat: ChatsType,
  user: UserProps,
  groupChatName?: string,
  setGroupChatName?: any,
  dispatch?: any
) => {
  if (!groupChatName) return;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      "/api/chat/renamegroup",
      {
        chatId: selectedChat._id,
        chatName: groupChatName,
      },
      config
    );
    dispatch(setSelectedChat(data));
    toast.success("Group Name Updated Successfully.");
    setGroupChatName("");
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.message ??
          "An error occurred, but there is no response data"
        : "An error occurred";

    toast.error(errorMessage);
  }
};
