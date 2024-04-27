import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import ListCard from "../../components/listCard/ListCard";
import "./profile.scss";
import { logoutUser } from "../../libs/dataApi";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ErrorPost from "../../components/ErrorPost/ErrorPost";
import LoaderPost from "../../components/LoaderPost/LoaderPost";

export default function ProfilePage() {
  const data = useLoaderData();

  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
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
          <Suspense fallback={<LoaderPost />}>
            <Await resolve={data.postResponse} errorElement={<ErrorPost />}>
              {(postResponse) => <ListCard posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<LoaderPost />}>
            <Await resolve={data.postResponse} errorElement={<ErrorPost />}>
              {(postResponse) => <ListCard posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<LoaderPost />}>
            <Await resolve={data.chatResponse} errorElement={<ErrorPost />}>
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
