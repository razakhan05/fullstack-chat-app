import { useState } from "react";
import { useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader } from "./CustomComponents/Loader";
import { UserListItem } from "./UserListItem";
import { UserBadgeItem } from "./CustomComponents/UserBadgeItem";
import { ChatsType, UserProps } from "../types/users";
import { setChats } from "../redux/chatSlice";

export const GroupChatModal: React.FC = () => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<UserProps[]>([]);

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);

  // Handle user search
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Handle adding users to the group
  const handleGroup = (userToAdd: UserProps) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      return toast.error("User already added");
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers)
      return toast.error("Please fill all the fields");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      toast.success("Group chat created successfully");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Handle user deletion from the group
  const handleDelete = (deleteUser: UserProps) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => selectedUser._id !== deleteUser._id
      )
    );
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* Close button */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Create Group Chat</h3>
        <div className="flex flex-col gap-2 my-3">
          <input
            onChange={(e) => setGroupChatName(e.target.value)}
            className="p-3 focus:outline-none bg-transparent border border-neutral rounded-md"
            placeholder="Group Chat Name"
          />
          {selectedUsers.length !== 0 && (
            <div className="flex h-10 cursor-pointer items-start overflow-x-auto">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </div>
          )}
          <input
            className="p-3 focus:outline-none bg-transparent border border-neutral rounded-md"
            placeholder="Add Users eg:Naruto,Madara,Sasuke..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          searchResult.slice(0, 4).map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleAccessChat={() => {
                handleGroup(user);
              }}
            />
          ))
        )}
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Create Chat
        </button>
      </div>
    </dialog>
  );
};
