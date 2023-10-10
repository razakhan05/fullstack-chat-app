import { ChangeEvent, useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { InputProps } from "../../types/componentsTypes";

export const Input = ({
  title,
  placeholder,
  fileType,
  passwordType,
  onChange,
}: InputProps) => {
  const [hidden, setHidden] = useState(true);
  const [inputValue, setInputValue] = useState(""); // Track input value

  const toggleHidden = () => {
    setHidden(!hidden);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setInputValue(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("raza");
    const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      setInputValue(file.name);
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-1 my-3">
      <label className="font-semibold">{title}</label>
      <div className=" border border-neutral rounded-md flex justify-between items-center">
        {fileType ? (
          <input
            type="file"
            accept="image/*"
            className="bg-transparent focus:outline-none w-full py-2"
            onChange={handleFileChange}
          />
        ) : (
          <input
            placeholder={placeholder}
            className="bg-transparent focus:outline-none px-4 w-full py-2"
            type={passwordType && hidden ? "password" : "text"}
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
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
