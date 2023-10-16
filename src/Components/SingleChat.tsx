import axios, { AxiosError } from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserProps, ChatsType } from "../types/users";
import { ChatInputField } from "./Chat/ChatInputField";
import { ChatHeader } from "./ChatHeader";
import { ChatMainArea } from "./ChatMainArea";
import { io } from "socket.io-client/debug";
import { Loader } from "./CustomComponents/Loader";
import { setNotification } from "../redux/chatSlice";

const ENDPOINT = "http://localhost:5400";
let socket, selectedChatCompare;
export const SingleChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  console.log(isTyping, "hello");

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const notification = useSelector(
    (state: { chat: any }) => state.chat.notification
  );

  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log(messages, "mansi");
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred, but there is no response data"
          : "An error occurred";

      toast.error(errorMessage);
    }
  };

  const sendMessage = async (e: KeyboardEvent) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        const errorMessage =
          error instanceof AxiosError
            ? error.response?.data.message ??
              "An error occurred, but there is no response data"
            : "An error occurred";

        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnection(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        console.log(newMessageRecieved, "biro");
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  console.log(notification, "mansi");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    //typing indicator
    if (!socketConnection) return;
    if (!typing) {
      setTyping(true);

      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDifference = timeNow - lastTypingTime;
      if (timeDifference >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="w-full h-full justify-between  flex items-center  flex-col">
      <ChatHeader />
      <ChatMainArea messages={messages} isTyping={isTyping} />

      {isTyping ? (
        <div className="flex fixed z-50 bottom-[7rem] left-[20rem]  justify-start w-full items-center  ">
          <div className=" bg-neutral p-3 animate-bounce flex  rounded-tl-none rounded-br-none rounded-md items-center justify-center gap-1">
            <div className="w-2 h-2 bg-primary-content rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2  bg-primary-content rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-content rounded-full animate-bounce"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>
        </div>
      ) : (
        ""
      )}
      <ChatInputField
        handleChange={handleChange}
        sendMessage={sendMessage}
        newMessage={newMessage}
      />
    </div>
  );
};
