import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setChats, setSelectedChat } from "../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { ChatsType, UserProps } from "../types/users";
import { Loader } from "./CustomComponents/Loader";
import { getSender } from "../config/ChatLogics";
import { GroupChatModal } from "./GroupChatModal";
import { Button } from "./CustomComponents/Button";

export const MyChatList = () => {
  // const [isSelected, setIsSelected] = useState<boolean>(false);
  // const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState();

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const dispatch = useDispatch();
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);
  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      dispatch(setChats(data));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchChats();
    }

    const userInfoFromStorage = localStorage.getItem("userInfo");
    if (userInfoFromStorage !== null) {
      setLoggedUser(JSON.parse(userInfoFromStorage));
    }
  }, [user]);

  return (
    <>
      <div className=" flex items-center  justify-between mx-2">
        <label className=" font-bold text-2xl">My Chats</label>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <Button
          title="New Group Chat"
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement;

            if (modal) {
              modal.showModal();
            }
          }}
        />
      </div>
      <div
        className=" my-2 overflow-y-auto h-[50vh]  scrollbar-thin flex flex-col gap-2"
        style={{ scrollbarWidth: "thin" }}
      >
        <>
          {chats ? (
            <>
              {chats.map((chat: UserProps) => (
                <>
                  <div
                    key={chat._id}
                    onClick={() => dispatch(setSelectedChat(chat))}
                    className={`p-2 cursor-pointer bg-neutral hover:bg-primary hover:text-primary-content ${
                      selectedChat === chat
                        ? " bg-primary text-primary-content"
                        : ""
                    } w-full`}
                  >
                    <h1 className="text-xl">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </h1>
                    <h3 className=" text-xs">RoadSide Coder : hello</h3>
                  </div>
                </>
              ))}
            </>
          ) : (
            <Loader isSkeleton />
          )}
        </>
      </div>
      <GroupChatModal />
    </>
  );
};
