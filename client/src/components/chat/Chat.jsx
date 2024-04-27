import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { singleChat } from "../../libs/dataApi";
import { format } from "timeago.js";

export default function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleOpenChat = async (id, reciver) => {
    try {
      const data = await singleChat(id);
      setChat({ ...data, reciver });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(chat, "<---dichatspage");

  return (
    <div className="chat">
      <div className="messageContainer">
        <h1>Messages</h1>
        {chats?.map((cht) => (
          <div
            className="message"
            key={cht.id}
            style={{
              backgroundColor: cht.seenBy.includes(currentUser.id) ? "white" : "goldenrod",
            }}
            onClick={() => handleOpenChat(cht.id, cht.reciver)}
          >
            <img src={cht.reciver.avatar || "/noavatar.jpg"} alt="" />
            <span>{cht.reciver.username}</span>
            <p>{cht.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.reciver.avatar || "/noavatar.jpg"} alt="" />
              {chat.reciver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
