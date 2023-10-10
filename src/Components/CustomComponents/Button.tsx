import { Loader } from "./Loader";
import { FormEvent } from "react";

interface ButtonProps {
  className?: string;
  secondaryBtn?: boolean;
  isLoading?: boolean;
  title: string;
  onClick: () => void;
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

  const handleClick = (e: FormEvent<Element>) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button
      className={btnClasses + (className ? ` ${className}` : "")}
      onClick={(e) => handleClick(e)}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};
