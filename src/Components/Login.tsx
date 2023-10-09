import { Input } from "./CustomComponents/Input";

export const Login = () => {
  return (
    <form>
      <h1 className=" font-bold text-3xl">Login</h1>
      <Input title="Email Address" placeholder="youremail@example.com" />
      <Input title="Password" placeholder="password" passwordType />
      <div className=" flex flex-col gap-2">
        <button className="btn btn-primary">Account Login</button>
        <button className="btn btn-secondary">
          Get Guest User Credentials
        </button>
      </div>
    </form>
  );
};
