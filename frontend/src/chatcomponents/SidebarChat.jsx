/** @format */
import avatarImage from "../assets/avator_profile.jpeg";
import Avatar from "@mui/material/Avatar";
const SidebarChat = ({ messages }) => {
  // Check if there are messages and the last message is not undefined
  const hasMessages = messages && messages.length > 0;
  const lastMessage = hasMessages ? messages[messages.length - 1] : null;

  return (
    <div className="sidebarChat">
      <Avatar src={avatarImage} />
      <div className="sidebarChat__info">
        {hasMessages ? (
          <>
            <h2>{lastMessage.name}</h2>
            <p>{lastMessage.message}</p>
          </>
        ) : (
          <p>No messages</p> // Or any other placeholder content
        )}
      </div>
    </div>
  );
};

export default SidebarChat;
