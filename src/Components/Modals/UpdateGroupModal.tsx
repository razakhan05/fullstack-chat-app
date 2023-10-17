import axios, { AxiosError } from "axios";
import { getSender } from "../../config/ChatLogics";
import { ChatsType, UserProps } from "../../types/users";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserBadgeItem } from "../CustomComponents/UserBadgeItem";
import { setSelectedChat } from "../../redux/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserListItem } from "../UserListItem";
import { handleUpdate } from "../../config/chatHandler";

interface UpdateProps {
  selectedChat: ChatsType;
  user: UserProps;
}
export const UpdateGroupModal = ({ selectedChat, user }: UpdateProps) => {
  const [groupChatName, setGroupChatName] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);

  const allUsers = useSelector(
    (state: { chat: { allUsers: UserProps[] } }) => state.chat.allUsers
  );
  const dispatch = useDispatch();

  const handleAddUser = async (addedUser: UserProps) => {
    if (!selectedChat) {
      return toast.error("No chat selected");
    }

    if (selectedChat.groupAdmin?._id !== user._id) {
      return toast.error("Only admin can add users");
    }

    if (selectedChat.users.some((u: UserProps) => u._id === addedUser._id)) {
      return toast.error("User is already in the group");
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.put(
        "https://chitchat-server-6cet.onrender.com/api/chat/groupadd",
        {
          userId: addedUser._id,
          chatId: selectedChat._id,
        },
        config
      );

      dispatch(setSelectedChat(response.data));
      toast.success("User Added Successfully");
    } catch (error) {
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data.message ||
          "An error occurred, but there is no response data";
      }

      toast.error(errorMessage);
    }
  };

  const handleRemove = async (removeUser: UserProps) => {
    if (selectedChat.groupAdmin._id !== user._id && removeUser._id !== user._id)
      return toast.error("Only admin can remove users");
    if (selectedChat.groupAdmin._id === removeUser._id) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://chitchat-server-6cet.onrender.com/api/chat/groupleave",
        {
          userId: removeUser._id,
          chatId: selectedChat._id,
        },
        config
      );
      dispatch(setSelectedChat(data));
      toast.success("User removed Successfully");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
    }
  };

  const handleLeaveFromGroup = async (leaveUser: UserProps) => {
    if (selectedChat.groupAdmin._id !== user._id && leaveUser._id !== user._id)
      return toast.error("Only admin can remove someone");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://chitchat-server-6cet.onrender.com/api/chat/groupleave",
        {
          userId: leaveUser._id,
          chatId: selectedChat._id,
        },
        config
      );

      leaveUser._id === user._id ? setSelectedChat([]) : setSelectedChat(data);
      toast.success("Group Leaved Successfully");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
    }
  };

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Update filtered users based on the search query
  useEffect(() => {
    const delay = setTimeout(() => {
      const filtered = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery, allUsers]);
  return (
    <dialog id="Update_Group_Modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <label className="font-bold text-xl">
          {!selectedChat?.isGroupChat ? (
            <>{getSender(user, selectedChat?.users)}</>
          ) : (
            selectedChat.chatName
          )}
        </label>

        <div className=" flex flex-col gap-3 mt-3">
          {/* added uper badge */}
          <div className="flex items-center cursor-pointer overflow-x-auto scrollbar-thin">
            {selectedChat?.users?.map((user: UserProps) => (
              <UserBadgeItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  handleRemove(user);
                }}
              />
            ))}
          </div>
          {/* input and update  */}
          <div className="  flex  items-center  gap-3">
            <input
              type="text"
              className=" input w-full input-bordered focus:border-none"
              placeholder="Chat name"
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <button
              className=" btn btn-neutral "
              onClick={() =>
                handleUpdate(
                  selectedChat,
                  user,
                  groupChatName,
                  setGroupChatName,
                  dispatch
                )
              }
            >
              Update
            </button>
          </div>
          <input
            placeholder="Add users"
            className=" input input-bordered w-full focus:border-none"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredUsers ? (
            <div className=" max-h-[10rem] scrollbar-thin overflow-y-auto">
              {filteredUsers?.map((user: UserProps) => (
                <UserListItem
                  key={user._id}
                  handleAccessChat={() => handleAddUser(user)}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <></>
          )}

          <button
            onClick={() => handleLeaveFromGroup(user)}
            className=" btn bg-red-500  hover:bg-red-400 text-primary-content"
          >
            Leave Group
          </button>
        </div>
      </div>
    </dialog>
  );
};
