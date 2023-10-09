import axios from "axios";
import { useEffect, useState } from "react";

export const ChatPage = () => {
  const [datas, setDatas] = useState([]);
  //fetching data from an api
  const fetchData = async () => {
    const { data } = await axios.get("/api/chat");
    setDatas(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      {datas.map((chat: any) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};
