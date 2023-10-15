import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../redux/chatSlice";
import { ChatsType, UserProps } from "../types/users";
import { Header } from "../Components/Header";
import { SideBar } from "../Components/SideBar";
import { SingleChat } from "../Components/SingleChat";

export const ChatPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserProps[];
      dispatch(setUser(parsedData));
    }
  }, [dispatch]);

  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );
  return (
    <div className="h-full flex w-full flex-col">
      <Header />
      <div className="flex w-full h-full">
        <SideBar />
        {selectedChat ? (
          <SingleChat />
        ) : (
          <div className="flex rounded-md m-4 bg-base-100 uppercase w-full justify-center items-center border border-neutral">
            Start the conversation
          </div>
        )}
      </div>
    </div>
  );
};
