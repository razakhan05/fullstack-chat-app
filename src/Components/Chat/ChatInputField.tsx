import { BsSendFill } from "react-icons/bs";
export const ChatInputField = () => {
  return (
    <div className=" flex items-center gap-3 w-full p-4">
      {/* Add emoji or file  */}
      <input
        className="input w-full bg-transparent input-bordered focus:border-none placeholder:text-gray-500"
        placeholder="write here"
      />
      <button className=" hover:bg-primary p-4 rounded-full  text-base-content">
        <BsSendFill />
      </button>
    </div>
  );
};
