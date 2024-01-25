/** @format */
import Sidebar from "../chatcomponents/Sidebar";
import "../chat.css";
function ChatApp() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
      </div>
    </div>
  );
}

export default ChatApp;
