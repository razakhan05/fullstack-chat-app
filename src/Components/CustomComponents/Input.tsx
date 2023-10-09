import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { InputProps } from "../../types/componentsTypes";

export const Input = ({
  title,
  placeholder,
  fileType,
  passwordType,
}: InputProps) => {
  const [hidden, setHidden] = useState(true);
  const [inputValue, setInputValue] = useState(""); // Track input value

  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1 my-3">
      <label className="font-semibold">{title}</label>
      <div className=" border border-neutral rounded-md flex justify-between items-center">
        <input
          placeholder={placeholder}
          className={"bg-transparent focus:outline-none px-4 w-full py-2"}
          accept="image/*"
          type={
            fileType ? "file" : passwordType && hidden ? "password" : "text"
          }
          value={inputValue} // Bind input value
          onChange={handleInputChange} // Handle input change
        />
        {passwordType &&
          inputValue && ( // Display toggle button conditionally
            <div
              className="text-primary cursor-pointer mr-2"
              onClick={toggleHidden}
            >
              {hidden ? <BiSolidHide /> : <BiSolidShow />}
            </div>
          )}
      </div>
    </div>
  );
};
