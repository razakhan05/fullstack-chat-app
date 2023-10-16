/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from "../types/users";

interface Messages {
  length: number;
  messages: any;
}

interface Message {
  sender: UserProps;
}

export const isSameSenderMargin = (
  messages: Messages,
  m: Message,
  i: number,
  userId: UserProps
): number | "auto" => {
  if (
    i < messages.length - 1 &&
    messages.messages[i + 1].sender._id === m.sender._id &&
    messages.messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages.messages[i + 1].sender._id !== m.sender._id &&
      messages.messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages.messages[i].sender._id !== userId)
  )
    return "auto";
  else return 0;
};

export const isSameSender = (
  messages: Messages,
  m: Message,
  i: number,
  userId: UserProps
): boolean => {
  return (
    i < messages.length - 1 &&
    (messages.messages[i + 1].sender._id !== m.sender._id ||
      messages.messages[i + 1].sender._id === undefined) &&
    messages.messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: Messages,
  i: number,
  userId: UserProps
): boolean => {
  return (
    i === messages.length - 1 &&
    messages.messages[messages.length - 1].sender._id !== userId &&
    messages.messages[messages.length - 1].sender._id
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
