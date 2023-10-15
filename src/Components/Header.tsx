import { IoIosNotifications } from "react-icons/io";
import { ProfileDropDown } from "./ProfileDropDown";

export const Header = () => {
  return (
    <div className="p-3 border-b border-neutral flex justify-between px-4 items-center">
      {/* logo */}
      <label>ChitChat</label>
      {/* profile & notification */}
      <div className=" flex items-center gap-4">
        <span className="cursor-pointer">
          <IoIosNotifications size="30px" />
        </span>
        <ProfileDropDown />
      </div>
    </div>
  );
};
