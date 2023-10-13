import { ButtonProps } from "../../types/componentsTypes";
import { Loader } from "./Loader";
import { FormEvent } from "react";

export const Button = ({
  className,
  secondaryBtn,
  isLoading,
  title,
  onClick,
}: ButtonProps) => {
  const btnClasses = `btn ${
    secondaryBtn ? "btn-secondary" : "btn-primary"
  }`;

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
