import { useState } from "react";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserProps } from "../../types/users";
export function ProfileDropDown() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const user = useSelector((state: { chat: UserProps }) => state.chat.user);

  const history = useHistory();
  const logOutHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.removeItem("userInfo");
    toast.success("logged out successfully");
    history.push("/");
  };

  const showModal = () => {
    const modal = document.getElementById(
      "Profile_Modal"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div onClick={handleClick} className=" cursor-pointer ">
        <img
          src={user?.picture}
          className="w-12 h-12 border-2 border-primary  rounded-full object-cover"
        />
      </div>
      {isOpen && (
        <div className="fixed border  border-neutral top-[70px] flex flex-col w-[14rem] rounded-md bg-base-300 right-2">
          <div className=" flex ">
            <label
              className=" bg-black border-b border-neutral rounded-md p-4 cursor-pointer w-full"
              onClick={showModal}
            >
              My Profile
            </label>
            <dialog id="Profile_Modal" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-neutral absolute right-2 top-2">
                    <GrClose />
                  </button>
                </form>
                <div className=" flex flex-col justify-center items-center gap-4 border border-neutral rounded-md p-4">
                  <label className="font-bold text-3xl">{user.name}</label>
                  <img
                    src={user.picture}
                    className=" w-60 h-60 border-2 border-primary  rounded-full object-cover"
                  />
                  <label className="font-semi-bold text-lg font-mono">
                    Email : {user.email}
                  </label>
                </div>
              </div>
            </dialog>
          </div>
          <label
            onClick={logOutHandler}
            className=" border-b border-neutral rounded-md p-4 cursor-pointer"
          >
            Logout
          </label>
        </div>
      )}
    </>
  );
}
