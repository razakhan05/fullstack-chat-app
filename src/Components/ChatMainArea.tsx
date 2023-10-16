import { isSameSender, isLastMessage } from "../config/ChatLogics";
import { useSelector } from "react-redux";
import { UserProps } from "../types/users";
import { Message } from "./SingleChat";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatMainArea = ({ messages }: any) => {
  const user = useSelector((state: { chat: UserProps }) => state.chat.user);

  return (
    <div
      className=" z-10 w-full  overflow-y-auto  h-[70vh] max-h-[70vh] border-t  border-neutral  scrollbar-thin
     flex flex-col p-3  bg-neutral bg-opacity-50"
    >
      {messages?.map((m: Message, index: number) => (
        <div
          className={` ${
            m.sender._id === user._id
              ? "flex justify-end items-center"
              : "flex items-center"
          }`}
          key={m._id}
        >
          {(isSameSender(messages, m, index, user._id) ||
            isLastMessage(messages, index, user._id)) && (
            <img src={m.sender.picture} className=" w-6 h-6 rounded-full" />
          )}

          <p
            className={`${
              m.sender._id === user._id
                ? "bg-secondary text-secondary-content"
                : "bg-accent text-accent-content tooltip tooltip-bottom"
            } rounded-tl-none rounded-br-none rounded-md py-1 px-2 m-1`}
            data-tip={m.sender.name}
          >
            {m.content}
          </p>
        </div>
      ))}
    </div>
  );
};
