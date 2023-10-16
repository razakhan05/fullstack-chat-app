import { useDispatch, useSelector } from "react-redux";
import { UserProps } from "../types/users";
import { getSender } from "../config/ChatLogics";
import { setNotification, setSelectedChat } from "../redux/chatSlice";

export const NotificationSideBar = () => {
  const notification = useSelector(
    (state: { chat: any }) => state.chat.notification
  );
  const user = useSelector((state: { chat: UserProps }) => state.chat.user);
 
  const dispatch = useDispatch();
  return (
    <div className="drawer z-50 drawer-end ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu  p-4 w-80 min-h-full bg-base-200 border border-neutral text-base-content">
          <div className=" flex flex-col gap-2 py-4">
            {!notification.length && "No New Messages"}
            {notification.map((noti: any) => (
              <div
                key={noti._id}
                className=" border border-neutral rounded-md p-2 cursor-pointer"
                onClick={() => {
                  dispatch(setSelectedChat(noti.chat));
                  dispatch(
                    setNotification(notification.filter((n) => n !== noti))
                  );
                }}
              >
                {noti.chat.isGroupChat
                  ? `New Message in ${noti.chat.chatName}`
                  : `New Message from ${getSender(user, noti.chat.users)}`}
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
