import { Navbar } from "../Components/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../redux/chatSlice";
import { UserProps } from "../types/users";
import { MyChats } from "../Components/MyChats";

export const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as UserProps[];
      dispatch(setUser(parsedData));
    }
  }, [dispatch]);
  return (
    <div className="w-full min-h-full">
      <Navbar />
      <MyChats />
    </div>
  );
};
