import { useSelector } from "react-redux";
import { getSender } from "../../config/ChatLogics";
import { UserProps } from "../../types/users";

export const NotificationModal = () => {
  const notification = useSelector(
    (state: { chat: any }) => state.chat.notification
  );
  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
 
  return (
    <div>
      <dialog id="Notification_Modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
         
        </div>
      </dialog>
    </div>
  );
};
