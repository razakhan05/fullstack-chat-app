import { useSelector } from "react-redux";
import { UserProps } from "../types/users";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

export const ProfileDropDown = () => {
  const user = useSelector(
    (state: { chat: { user: UserProps } }) => state.chat.user
  );

  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
    toast.success("Logout");
  };
  return (
    <div className="dropdown ">
      <img
        src={user?.picture}
        className="w-10 h-10 object-cover rounded-full cursor-pointer"
        tabIndex={0}
      />
      <div
        tabIndex={0}
        className="dropdown-content right-0 top-[7vh] rounded-md bg-base-300 border border-neutral"
      >
        <div className="flex flex-col gap-10 my-2  p-4">
          {/* user details */}
          <div className="flex items-center w-full gap-3 ">
            <img
              src={user?.picture}
              className=" object-cover w-10 h-10 rounded-full border"
              onClick={() => {}}
            />
            <div className="">
              <h1 className="font-bold text-xl">{user?.name}</h1>
              <h1>{user?.email}</h1>
            </div>
          </div>

          <div>
            {/* customize theme */}
            <h1 className="uppercase font-bold">Change theme</h1>
            <div className="flex gap-2">
              <div className=" rounded-full w-10 h-10 bg-red-500"></div>
              <div className=" rounded-full w-10 h-10 bg-red-500"></div>
              <div className=" rounded-full w-10 h-10 bg-red-500"></div>
              <div className=" rounded-full w-10 h-10 bg-red-500"></div>
            </div>
          </div>
          <div>
            {/* Wallpaper */}
            <h1 className="uppercase font-bold">Change theme</h1>
            <div className="  grid grid-rows-2 gap-4 grid-flow-col">
              <img src="" className=" rounded-md w-20 h-20" />
              <img src="" className=" rounded-md w-20 h-20" />
              <img src="" className=" rounded-md w-20 h-20" />
              <img src="" className=" rounded-md w-20 h-20" />
              <img src="" className=" rounded-md w-20 h-20" />
              <img src="" className=" rounded-md w-20 h-20" />
            </div>
          </div>
          <button onClick={logoutHandler} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
