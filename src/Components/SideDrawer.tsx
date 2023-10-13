import axios, { AxiosError } from "axios";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "../types/users";
import { Loader } from "./CustomComponents/Loader";
import { UserListItem } from "./UserListItem";
import { setChats, setSelectedChat } from "../redux/chatSlice";
import { MyChatList } from "./MyChatList";

export const SideDrawer = () => {
  const [search, setSearch] = useState<string>();
  const [searchResult, setSearchResult] = useState<UserProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const chats = useSelector(
    (state: {
      chat: {
        chats: [];
      };
    }) => state.chat.chats
  );

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string | undefined> };
  }) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    if (!search) return toast.error("Please enter something to search.");
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

  const handleAccessToChat = async (userId: string) => {
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((chat: { _id: string }) => chat._id === data._id))
        dispatch(setChats([data, ...chats]));
      dispatch(setSelectedChat(data));
      setLoading(false);
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
  return (
    <div className="drawer h-full w-1/6 lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side w-full">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* sidebar view  content */}
        <div className="w-80 min-h-full  bg-base-300 border-r border-neutral">
          <label className="flex p-2  font-bold text-xl border-b border-neutral w-full">
            LOGO
          </label>

          {/* searchbar & list of users */}
          <div>
            {/* search button */}
            <div className=" flex gap-1 mx-1 my-1">
              <input
                placeholder="search"
                onChange={handleSearchChange}
                className=" focus:outline-none bg-transparent hover:border-2  px-2 py-1  border border-neutral  flex w-full"
              />
              <button
                className=" p-3 bg-primary flex items-center justify-center text-primary-content w-12 h-10 rounded-md"
                onClick={handleSearch}
              >
                Go
              </button>
            </div>
            {/* list of  searched users */}
            {loading ? (
              <Loader isSkeleton />
            ) : searchResult?.length ? (
              searchResult.map((user) => (
                <UserListItem
                  handleAccessChat={() => handleAccessToChat(user._id)}
                  user={user}
                />
              ))
            ) : (
              <div className="flex italic items-center justify-center border border-neutral mx-1 my-2  p-10">
                Not found
              </div>
            )}

            <MyChatList />
          </div>
        </div>
      </div>
    </div>
  );
};
