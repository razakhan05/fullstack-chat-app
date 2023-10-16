import { useSelector } from "react-redux";
import { UserProps } from "../types/users";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

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

  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "forest";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const clickHandler = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <div className="dropdown">
      <img
        src={user?.picture}
        className="w-10 h-10  object-cover rounded-full border border-neutral container cursor-pointer"
        tabIndex={0}
      />
      <div
        tabIndex={0}
        className="dropdown-content right-0 top-[7vh] rounded-md bg-base-300 border border-neutral"
      >
        <div className="flex flex-col gap-10 my-2 w-[16rem]  p-4">
          {/* user details */}
          <div className="flex items-center w-full gap-3 ">
            <img
              src={user?.picture}
              className="  object-cover w-10 h-10 rounded-full border"
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
              <div
                onClick={() => clickHandler("forest")}
                className=" flex justify-center items-center rounded-full border-2 border-neutral w-10 h-10"
              >
                <div className=" bg-black flex h-full w-full rounded-l-full"></div>
                <div className=" bg-green-500 flex  h-full w-full rounded-r-full"></div>
              </div>
              <div
                onClick={() => clickHandler("lofi")}
                className=" flex justify-center items-center rounded-full border-2 border-neutral w-10 h-10"
              >
                <div className=" bg-white flex h-full w-full rounded-l-full"></div>
                <div className=" bg-black flex  h-full w-full rounded-r-full"></div>
              </div>
              <div
                onClick={() => clickHandler("luxury")}
                className=" flex justify-center items-center rounded-full border-2 border-neutral w-10 h-10"
              >
                <div className=" bg-black flex h-full w-full rounded-l-full"></div>
                <div className=" bg-amber-600 flex  h-full w-full rounded-r-full"></div>
              </div>
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
