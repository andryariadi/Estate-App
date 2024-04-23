import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import ListCard from "../../components/listCard/ListCard";
import "./profile.scss";
import { logoutUser } from "../../libs/dataApi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();

  const { currentUser, updateUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logoutUser();
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <ListCard />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <ListCard />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}
