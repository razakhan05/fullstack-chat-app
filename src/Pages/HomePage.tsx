import { useState } from "react";
import { Login } from "../Components/Login";
import { Register } from "../Components/Register";

export const HomePage = () => {
  const [displayLogin, setDisplayLogin] = useState<boolean>(false);
  const toggleLogin = () => setDisplayLogin(!displayLogin);

  return (
    <div className="container sm:max-w-md max-w-xs flex flex-col justify-center">
      <label className=" font-mono font-bold text-4xl  text-center py-6">
        Chit Chat
      </label>
      <div className="bg-base-200 p-4 rounded-md">
        {displayLogin ? <Login /> : <Register />}
      </div>
      <div className="flex justify-center pt-4">
        {displayLogin ? (
          <>
            Don't have an account?
            <button className="text-primary" onClick={toggleLogin}>
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?
            <button className="text-primary" onClick={toggleLogin}>
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};
