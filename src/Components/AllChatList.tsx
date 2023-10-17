import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../redux/chatSlice";
import { getSender } from "../config/ChatLogics";
import { ChatsType, UserProps } from "../types/users";

interface AllChatListProps {
  chat: ChatsType;
  loggedUser: UserProps;
}
export const AllChatList = ({ chat }: AllChatListProps) => {
  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: { chat: any }) => state.chat.user);
  return (
    <div
      key={chat._id}
      onClick={() => dispatch(setSelectedChat(chat))}
      className={` px-2 py-1 cursor-pointer rounded-md  border border-neutral hover:bg-neutral ${
        selectedChat === chat ? " bg-neutral" : ""
      } `}
    >
      <h1 className="text-xl font-bold">
        {user && (
          <>
            {!chat?.isGroupChat ? getSender(user, chat.users) : chat.chatName}
          </>
        )}
      </h1>
      <h3 className=" text-xs font-semibold">RoadSide Coder : hello</h3>
    </div>
  );
};
