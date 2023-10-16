import { BsSendFill } from "react-icons/bs";

interface ChatInputProps {
  handleChange: any;
  sendMessage: any;
  newMessage: any;
}
export const ChatInputField = ({
  handleChange,
  sendMessage,
  newMessage,
}: ChatInputProps) => {
  return (
    <div className="flex  gap-3 w-full  h-24 p-4">
      {/* Add emoji or file  */}

      <input
        className="input bg-transparent w-full input-bordered focus:border-none placeholder:text-gray-500"
        placeholder="write here"
        value={newMessage}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => sendMessage(e)}
      />
      <button
        className="btn text-primary btn-neutral p-4 rounded-full"
        onClick={() => sendMessage({ key: "Enter" })}
      >
        <BsSendFill />
      </button>
    </div>
  );
};
