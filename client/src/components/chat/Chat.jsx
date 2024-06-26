import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import { singleChat } from "../../libs/dataApi";
import { format } from "timeago.js";
import apiRequest from "../../libs/apiRequest";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../libs/notificationStore";

export default function Chat({ chats }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, reciver) => {
    try {
      const data = await singleChat(id);
      if (data.seenBy.includes(currentUser.id)) decrease();
      setChat({ ...data, reciver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitChat = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post(`/messages/${chat.id}`, { text });

      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));

      e.target.reset();

      socket.emit("sendMessage", {
        reciverId: chat.reciver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put(`/chats/read/${chat.id}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [chat, socket]);

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
              backgroundColor: cht.seenBy.includes(currentUser.id) || chat?.id === cht.id ? "white" : "goldenrod",
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
            <div ref={messageEndRef}></div>
          </div>
          <form className="bottom" onSubmit={handleSubmitChat}>
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}
