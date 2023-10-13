import { SideDrawer } from "./SideDrawer";
import { IoIosNotifications } from "react-icons/io";
import { ProfileDropDown } from "./CustomComponents/ProfileDropDown";
export const Navbar = () => {
  return (
    <div className="w-full h-20 sm:12 bg-base-300 flex border-b border-neutral items-center justify-between">
      <SideDrawer />
      <label className="font-bold text-2xl font-mono">Chit Chat</label>
      <div className=" flex items-center mr-2 gap-2">
        <span className=" text-primary cursor-pointer">
          <IoIosNotifications size="2rem" />
        </span>
        <ProfileDropDown />
      </div>
    </div>
  );
};
