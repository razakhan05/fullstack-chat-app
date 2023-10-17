import { useState } from "react";
import { Button } from "../CustomComponents/Button";
import { Input } from "../CustomComponents/Input";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useHistory } from "react-router-dom";

export const Login = () => {
  // State for email, password, and loading indicator
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);

    // Check if email and password are provided
    if (!email || !password) {
      toast.error("Please enter all fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Send a POST request to the server for login
      const { data } = await axios.post(
        "https://chitchat-server-6cet.onrender.com/api/user/login",
        { email, password },
        config
      );

      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message ??
            "An error occurred check if backend is connected with frontend or not"
          : "An error occurred";

      toast.error(errorMessage);
      setLoading(false);
    }
  };
  return (
    <form>
      <h1 className=" font-bold text-3xl">Login</h1>
      <Input
        title="Email Address"
        value={email}
        placeholder="youremail@example.com"
        onChange={(data) => setEmail(data as string)}
      />
      <Input
        title="Password"
        value={password}
        placeholder="password"
        passwordType
        onChange={(data) => setPassword(data as string)}
      />
      <div className=" flex flex-col gap-2">
        <Button
          title="Account Login"
          className=" w-full"
          isLoading={loading}
          onClick={submitHandler}
        />
        <Button
          title="Get Guest User Credentials"
          className="w-full"
          secondaryBtn
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("guest@guest");
          }}
        />
      </div>
    </form>
  );
};
