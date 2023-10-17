import axios, { AxiosError } from "axios";
import { useState, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UserProps, ChatsType } from "../types/users";
import { ChatInputField } from "./Chat/ChatInputField";
import { ChatHeader } from "./ChatHeader";
import { ChatMainArea } from "./ChatMainArea";
import { io } from "socket.io-client/debug";
import { setNotification } from "../redux/chatSlice";

export interface Message {
  _id: string;
  content: string;
  sender: UserProps;
  chat: {
    _id: string;
  };
}
const ENDPOINT = "http://localhost:5400";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let socket: any, selectedChatCompare: ChatsType | null;
export const SingleChat = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnection, setSocketConnection] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
  const notification = useSelector(
    (state: { chat: { notification: Message[] } }) => state.chat.notification
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
        `https://chitchat-server-6cet.onrender.com/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
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
          "https://chitchat-server-6cet.onrender.com/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        if (data) {
          socket.emit("new-message", data);
        }
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
    socket.on("message-recieved", (newMessageRecieved: Message) => {
      console.log(newMessageRecieved, "new message");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    //typing indicator
    if (!socketConnection) return;
    if (!typing) {
      if (user) {
        setTyping(true);
      }
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDifference = timeNow - lastTypingTime;
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
        <div className="flex fixed z-50 bottom-[7rem] left-[20rem] justify-start w-full items-center  ">
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
