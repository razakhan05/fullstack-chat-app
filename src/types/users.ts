export interface UserProps {
  allUsers: any;
  token: any;
  chatName: string;
  users: any;
  isGroupChat: boolean;
  email: string;
  name: string;
  picture: string | undefined;
  _id: string;
  user: {
    token?: string;
    picture: string | undefined;
    name: string;
    email: string;
  };
}

export interface ChatsType {
  groupAdmin: any;
  _id: string;
  users: [];
  isGroupChat: any;
  selectedChat: any;
  chats: any;
  chatName: string;
}
