import { useSelector } from "react-redux";
import { ChatsType, UserProps } from "../types/users";
import { MdGroupAdd } from "react-icons/Md";
import {
  getSender,
  getSenderFull,
  getSenderPicture,
} from "../config/ChatLogics";
import { UpdateGroupModal } from "./Modals/UpdateGroupModal";

export const ChatHeader = () => {
  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);

  const showModal = () => {
    const modal = document.getElementById(
      "Update_Group_Modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <div className=" h-16   w-full">
      <div className="flex items-center h-full justify-between px-4 py-2">
        <div className="flex gap-3 items-center">
          {!selectedChat?.isGroupChat ? (
            <img
              src={getSenderPicture(user, selectedChat?.users)}
              className=" w-10  h-10 rounded-full"
            />
          ) : (
            <></>
          )}

          <label className="text-2xl uppercase font-bold">
            {!selectedChat?.isGroupChat ? (
              <>{getSender(user, selectedChat?.users)}</>
            ) : (
              selectedChat.chatName
            )}
          </label>
        </div>

        {selectedChat?.isGroupChat && (
          <>
            {/* update Group modal */}
            <button
              className="btn btn-neutral rounded-full"
              onClick={showModal}
            >
              <MdGroupAdd size="1rem" />
            </button>
            <UpdateGroupModal
              selectedChat={selectedChat}
              user={user as UserProps}
            />
          </>
        )}
      </div>
    </div>
  );
};
