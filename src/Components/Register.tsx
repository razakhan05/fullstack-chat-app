import { Input } from "./CustomComponents/Input";

export const Register = () => {
  return (
    <form>
      <label className=" font-bold text-3xl">Create Account</label>
      <Input title="Name" placeholder="yourname" />
      <Input title="Email Address" placeholder="youremail@example.com" />
      <Input title="Password" placeholder="password" passwordType />
      <Input title="Confirm Password" placeholder="password" passwordType />
      <Input title="Upload your picture" fileType />

      <button className=" btn btn-primary bg-primary w-full">
        Account Register
      </button>
    </form>
  );
};
