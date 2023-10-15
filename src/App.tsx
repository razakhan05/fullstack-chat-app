import { Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ChatPage } from "./Pages/ChatPage";
function App() {
  return (
    <div className="h-[100vh] flex font-mono w-full text-gray-400 bg-base-300">
      <Route path="/" exact component={HomePage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
