import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AddUsersToChat } from "./Modals/AddUsersToChat";
import { SearchUserToChat } from "./Modals/SearchUserToChat";
import { useDispatch, useSelector } from "react-redux";
import { ChatsType, UserProps } from "../types/users";
import { Loader } from "./CustomComponents/Loader";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { setChats } from "../redux/chatSlice";
import { AllChatList } from "./AllChatList";
export const SideBar = () => {
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);

  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState<UserProps[]>([]);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("https://chitchat-server-6cet.onrender.com/api/chat", config);
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

  const showModal = (modalName: string) => {
    const modal = document.getElementById(
      modalName
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <>
      <div
        className=" z-50 hidden md:flex  flex-col
     gap-3  h-full border-r border-neutral w-[50vh]"
      >
        <div className="flex flex-col gap-3 px-3 pt-3 justify-center">
          <button
            className="btn btn-neutral w-full  "
            onClick={() => showModal("Search_User_Modal")}
          >
            Search user to chat
          </button>
          <div className="flex items-center justify-between">
            <label className=" font-bold uppercase text-lg">Chats</label>
            <button
              className=" btn btn-neutral"
              onClick={() => showModal("Add_Users_Modal")}
            >
              <AiOutlineUsergroupAdd /> <div>Add</div>
            </button>
          </div>
        </div>
        {/* All chats & group chat list */}

        <div
          className="flex overflow-y-auto
         max-h-[70vh] flex-col mx-2 gap-3"
          style={{ scrollbarWidth: "thin" }}
        >
          <>
            {chats ? (
              <>
                {chats?.map((chat: ChatsType) => (
                  <AllChatList
                    chat={chat}
                    key={chat?._id}
                    loggedUser={loggedUser as unknown as UserProps}
                  />
                ))}
              </>
            ) : (
              <Loader isSkeleton />
            )}
          </>
        </div>
      </div>
      {/* Modals */}
      <AddUsersToChat />
      <SearchUserToChat />
    </>
  );
};
