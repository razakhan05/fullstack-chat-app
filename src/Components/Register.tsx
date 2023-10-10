import { FormEvent, useState } from "react";
import { Input } from "./CustomComponents/Input";
import { toast } from "react-hot-toast";
import { Button } from "./CustomComponents/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Register = () => {
  // State variables for user inputs and loading status
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Get the history object for navigation
  const history = useHistory();

  const submitHandler = async (e: FormEvent<Element>) => {
    e.preventDefault();
    setLoading(true);

    // Check if any required field is empty
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // Send registration data to the server
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );
      toast.success("Registration is successful");
      console.log("successfull registration my bio");

      // Store user information in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      // Redirect to the "chats" page
      history.push("/chats");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred");
      }
      setLoading(false);
    }
  };

  // Handle image upload
  const postDetails = (pic: string | File) => {
    setLoading(true);

    if (!pic) {
      toast.error("Please select an image!");
      setLoading(false);
      return;
    }

    // Ensure 'pic' is a File
    if (pic instanceof File) {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chitchat");
      data.append("cloud_name", "dffpsg5pa");

      // Upload the image to a cloud storage service
      fetch("https://api.cloudinary.com/v1_1/dffpsg5pa/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPicture(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      toast.error("Please select an image (jpeg or png only).");
      setLoading(false);
    }
  };

  return (
    <form>
      <label className="font-bold text-3xl">Create Account</label>
      {/* Input fields for name, email, and password */}
      <Input
        title="Name"
        placeholder="yourname"
        onChange={(data) => setName(data as string)}
      />
      <Input
        title="Email Address"
        placeholder="youremail@example.com"
        onChange={(data) => setEmail(data as string)}
      />
      <Input
        title="Password"
        placeholder="password"
        passwordType
        onChange={(data) => setPassword(data as string)}
      />
      <Input
        title="Confirm Password"
        placeholder="password"
        passwordType
        onChange={(data) => setConfirmPassword(data as string)}
      />
      {/* Input field for uploading a picture */}
      <Input
        title="Upload your picture"
        fileType
        onChange={(pic: File | string) => postDetails(pic)}
      />

      {/* Button for form submission */}
      <Button
        title="Account Register"
        className="w-full"
        isLoading={loading}
        onClick={(e) => submitHandler(e)}
      />
    </form>
  );
};
