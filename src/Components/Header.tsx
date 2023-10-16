import { ProfileDropDown } from "./ProfileDropDown";
import { PiSidebarFill } from "react-icons/pi";
import { MdGroupAdd } from "react-icons/Md";
import { ChatsType, UserProps } from "../types/users";
import { AllChatList } from "./AllChatList";
import { Loader } from "./CustomComponents/Loader";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";
import { NotificationSideBar } from "./NotificationSideBar";

export const Header = () => {
  const chats = useSelector((state: { chat: ChatsType }) => state.chat.chats);
  const notification = useSelector(
    (state: { chat: any }) => state.chat.notification
  );
  const user = useSelector((state: { user: UserProps }) => state.chat.user);
  const showModal = (modalName: string) => {
    const modal = document.getElementById(
      modalName
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  return (
    <>
      <div className=" z-50 justify-between border-b border-neutral flex py-3 px-4  items-center">
        <div className="flex md:hidden">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className=" cursor-pointer  text-primary"
              >
                <PiSidebarFill size="25px" />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu p-4 w-80 bg-base-300 border-neutral border min-h-full flex">
                {/* Sidebar content here */}
                <div
                  className="flex  flex-col
     gap-3  h-full"
                >
                  <div className="flex flex-col gap-3 px-3 pt-3 justify-center">
                    <button
                      className="border rounded-md p-2 border-neutral   "
                      onClick={() => showModal("Search_User_Modal")}
                    >
                      Search user to chat
                    </button>
                    <div className="flex items-center justify-between">
                      <label className=" font-bold uppercase text-lg">
                        Chats
                      </label>
                      <button
                        className="border rounded-md p-2 border-neutral flex items-center gap-2"
                        onClick={() => showModal("Add_Users_Modal")}
                      >
                        <MdGroupAdd /> <div>Add</div>
                      </button>
                    </div>
                  </div>
                  {/* All chats & group chat list */}

                  <div
                    className="flex overflow-y-auto
         max-h-[70vh] flex-col mx-2 gap-3"
                    style={{ scrollbarWidth: "thin" }}
                  >
                    <>
                      {chats ? (
                        <>
                          {chats?.map((chat: ChatsType) => (
                            <AllChatList
                              chat={chat}
                              key={chat._id}
                              loggedUser={user as unknown as UserProps}
                            />
                          ))}
                        </>
                      ) : (
                        <Loader isSkeleton />
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* logo */}
        <label className=" hidden sm:block">ChitChat</label>
        {/* profile & notification */}
        <div className=" flex gap-2 items-center  justify-evenly">
          <label
            htmlFor="my-drawer-4"
            className="drawer-button  cursor-pointer "
          >
            <div className="flex  items-center text-primary">
              <div className="">
                <IoIosNotifications size="25px" />
              </div>
              {notification?.length > 0 && (
                <h1 className="rounded-full bg-red-500 text-primary-content w-4 text-center fixed top-[14px] right-[70px] h-4 text-[10px]">
                  {notification?.length}
                </h1>
              )}
            </div>
          </label>
          <NotificationSideBar />
          <ProfileDropDown />
        </div>
      </div>
    </>
  );
};
