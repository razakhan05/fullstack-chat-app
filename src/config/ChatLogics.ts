/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from "../types/users";

interface Sender {
  sender: any;
  _id: string;
}

interface Message {
  sender: Sender;
}

interface Messages {
  length: number;
  messages: Message[];
}

export const isSameSender = (
  messages: Messages,
  m: Message,
  i: number,
  userId: UserProps
): boolean => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]?.sender._id !== m.sender._id ||
      messages[i + 1]?.sender._id === undefined) &&
    messages[i]?.sender._id !== userId
  );
};

export const isLastMessage = (
  messages: Messages,
  i: number,
  userId: UserProps
): boolean => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1]?.sender._id !== userId &&
    messages[messages.length - 1]?.sender._id
  );
};

export const isSameUser = (
  messages: Messages,
  m: Message,
  i: number
): boolean => {
  return i > 0 && messages.messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (
  loggedUser: UserProps,
  users: UserProps[]
): string | undefined => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};

export const getSenderFull = (
  loggedUser: UserProps,
  users: UserProps[]
): UserProps | undefined => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const getSenderPicture = (
  loggedUser: UserProps,
  users: UserProps[]
): string | undefined => {
  return users[0]?._id === loggedUser?._id
    ? users[1].picture
    : users[0].picture;
};
