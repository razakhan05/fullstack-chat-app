import { Loader } from "./Loader";
import { MouseEventHandler } from "react";

interface ButtonProps {
  className?: string;
  secondaryBtn?: boolean;
  isLoading?: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  className,
  secondaryBtn,
  isLoading,
  title,
  onClick,
}: ButtonProps) => {
  const btnClasses = `btn ${
    secondaryBtn ? "btn-secondary" : "btn-primary"
  } w-full`;

  return (
    <button
      className={btnClasses + (className ? ` ${className}` : "")}
      onClick={onClick}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};
