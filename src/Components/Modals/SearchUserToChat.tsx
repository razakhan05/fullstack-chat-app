import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setChats, setSelectedChat } from "../../redux/chatSlice";
import { ChatsType, UserProps } from "../../types/users";
import { UserListItem } from "../UserListItem";

export const SearchUserToChat: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: { chat: { user: UserProps } }) => state.chat.user
  );
  const allUsers = useSelector(
    (state: { chat: { allUsers: UserProps[] } }) => state.chat.allUsers
  );
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<UserProps[]>([]);

  // Fetch all users when the component mounts or the user changes
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        if (!user) {
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("https://chitchat-server-6cet.onrender.com/api/user", config);
        dispatch(setAllUsers(data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data.message || "An error occurred";
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred");
        }
      }
    };

    fetchAllUsers();
  }, [user]);

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

  //access to user function
  const handleAccessToChat = async (userId: string) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("https://chitchat-server-6cet.onrender.com/api/chat", { userId }, config);

      if (!chats.find((chat: { _id: string }) => chat?._id === data?._id)) {
        dispatch(setChats([data, ...chats]));
      }
      dispatch(setSelectedChat(data));
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
    <dialog id="Search_User_Modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl">Search by name</h3>
        <div className="flex flex-col gap-3 mt-4">
          <input
            className="input input-bordered focus:border-none"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="max-h-[20rem] overflow-y-auto">
            {allUsers.length !== 0 ? (
              <>
                {filteredUsers?.map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    handleAccessChat={() => handleAccessToChat(user?._id)}
                  />
                ))}
              </>
            ) : (
              <div className=" border border-neutral flex p-4 rounded-md h-40 items-center justify-center">
                No User
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};
