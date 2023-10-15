import { ChatInputField } from "./Chat/ChatInputField";
import { ChatHeader } from "./ChatHeader";
import { ChatMainArea } from "./ChatMainArea";

export const SingleChat = () => {
  return (
    <div className=" h-full  w-full items-center justify-between  flex flex-col">
      <ChatHeader />
      <ChatMainArea />
      <ChatInputField />
    </div>
  );
};
