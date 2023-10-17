import { useSelector } from "react-redux";
import { ChatsType, UserProps } from "../types/users";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getSender, getSenderPicture } from "../config/ChatLogics";
import { UpdateGroupModal } from "./Modals/UpdateGroupModal";

export const ChatHeader = () => {
  const selectedChat = useSelector(
    (state: { chat: ChatsType }) => state.chat.selectedChat
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: { chat: any }) => state.chat.user);

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
              <AiOutlineUsergroupAdd size="1rem" />
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
