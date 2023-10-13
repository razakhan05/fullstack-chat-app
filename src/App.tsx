import { Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
function App() {
  return (
    <div className=" min-h-[100vh] font-mono  flex">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
