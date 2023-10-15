import { BsSend } from "react-icons/bs";
export const ChatInputArea = () => {
  return (
    <div className=" flex fixed items-center p-4 bottom-0 bg-base-300 rounded-md  gap-3 mx-2">
      <input
        className=" input input-bordered w-full"
        placeholder="write something..."
      />
      <button className=" btn btn-primary rounded-full">
        <BsSend />
      </button>
    </div>
  );
};
