export interface UserProps {
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
  selectedChat: any;
  chats: any;
  chatName: string;
}
