import { Route, useHistory } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
// import { useEffect } from "react";
import { MainPage } from "./Components/test/MainPage";
function App() {
  // const history = useHistory();
  // useEffect(() => {
  //   const loggedUser = localStorage.getItem("userInfo");
  //   if (!loggedUser) {
  //     history.push("/");
  //   }
  // }, []);
  return (
    <div className="h-[100vh] font-mono w-full  text-gray-400 bg-base-300">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={ChatPage} />
      <Route path="/main" component={MainPage} />
    </div>
  );
}

export default App;
