import { MouseEventHandler } from "react";
import { UserProps } from "../types/users";

export const UserListItem = ({
  user,
  handleAccessChat,
}: {
  user: UserProps;
  handleAccessChat: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="h-full w-full">
      <div
        onClick={handleAccessChat}
        className="flex hover:bg-neutral cursor-pointer gap-2 items-center border border-neutral mx-1 my-2 rounded-md px-3 py-2"
      >
        <img src={user.picture} className="w-9 h-9 rounded-full" />
        <div className="flex flex-col">
          <h1 className="font-semibold">{user.name}</h1>
          <h1 className="text-xs">Email : {user.email}</h1>
        </div>
      </div>
    </div>
  );
};
