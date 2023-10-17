import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { setSelectedChat } from "../redux/chatSlice";
import { ChatsType, UserProps } from "../types/users";

export const handleUpdate = async (
  selectedChat: ChatsType,
  user: UserProps,
  groupChatName?: string,
  setGroupChatName?: (value: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch?: (action: any) => void
) => {
  if (!groupChatName) return;
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      "https://chitchat-server-6cet.onrender.com/api/chat/renamegroup",
      {
        chatId: selectedChat._id,
        chatName: groupChatName,
      },
      config
    );

    if (dispatch) {
      dispatch(setSelectedChat(data));
    }

    if (setGroupChatName) {
      setGroupChatName("");
    }

    toast.success("Group Name Updated Successfully.");
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data.message ??
          "An error occurred, but there is no response data"
        : "An error occurred";

    toast.error(errorMessage);
  }
};
