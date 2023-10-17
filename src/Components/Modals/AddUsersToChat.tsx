import { useEffect, useState } from "react";
import { UserBadgeItem } from "../CustomComponents/UserBadgeItem";
import { UserListItem } from "../UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { ChatsType, UserProps } from "../../types/users";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { setChats } from "../../redux/chatSlice";

export const AddUsersToChat = () => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<UserProps[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<UserProps[]>([]);

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);

  const dispatch = useDispatch();
  const allUsers = useSelector(
    (state: { chat: UserProps }) => state.chat.allUsers
  );

  // Handle search input change
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  // Update filtered users based on the search query
  useEffect(() => {
    const delay = setTimeout(() => {
      const filtered = allUsers.filter((user: { name: string }) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchResult(filtered);
    }, 300);

    return () => clearTimeout(delay);
  }, [search, allUsers]);

  // Handle user deletion from the group
  const handleDelete = (deleteUser: UserProps) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => selectedUser._id !== deleteUser._id
      )
    );
  };
  // Handle adding users to the group
  const handleGroup = (userToAdd: UserProps) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      return toast.error("User already added");
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  // Handle form submission
  const handleCreateGroup = async () => {
    if (!groupChatName || !selectedUsers)
      return toast.error("Please fill all the fields");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "https://chitchat-server-6cet.onrender.com/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      dispatch(setChats([data, ...chats]));
      toast.success("Group chat created successfully");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
    }
  };
  return (
    <>
      <dialog id="Add_Users_Modal" className="modal">
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
                    handleFunction={() => {
                      handleDelete(user);
                    }}
                  />
                ))}
              </div>
            )}
            <input
              className="p-3 focus:outline-none bg-transparent border border-neutral rounded-md"
              placeholder="Add users"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className=" max-h-[30vh]  overflow-y-scroll flex flex-col">
            {searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleAccessChat={() => {
                  handleGroup(user);
                }}
              />
            ))}
          </div>
          <button
            onClick={handleCreateGroup}
            className="btn btn-primary w-full"
          >
            Create Chat
          </button>
        </div>
      </dialog>
    </>
  );
};
