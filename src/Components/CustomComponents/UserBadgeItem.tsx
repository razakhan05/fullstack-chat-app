import { AiOutlineClose } from "react-icons/ai";
import { UserProps } from "../../types/users";

interface user {
  user: UserProps;
  handleFunction: () => void;
}
export const UserBadgeItem = ({ user, handleFunction }: user) => {
  return (
    <div
      className=" px-2 py-1  rounded-md bg-neutral flex justify-between  gap-2 items-center mx-1 "
      onClick={handleFunction}
    >
      <label className=" whitespace-nowrap text-xs">{user.name}</label>
      <AiOutlineClose size=" 10px" />
    </div>
  );
};
