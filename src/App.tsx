import { Route, useHistory } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
import { useEffect } from "react";
function App() {
  const history = useHistory();
  useEffect(() => {
    const loggedUser = localStorage.getItem("userInfo");
    if (!loggedUser) {
      history.push("/");
    }
  }, []);
  return (
    <div className="h-[100vh] font-mono w-full  text-gray-400 bg-base-300">
      <Route path="https://fullstack-chat-app-coral.vercel.app" exact component={HomePage} />
      <Route path="https://fullstack-chat-app-coral.vercel.app/chats" component={ChatPage} />
    </div>
  );
}

export default App;
