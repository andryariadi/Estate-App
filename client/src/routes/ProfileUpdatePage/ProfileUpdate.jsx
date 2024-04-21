import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./profileupdate.scss";
import { updatedUser } from "../../libs/dataApi";

export default function ProfileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  console.log(currentUser, "<----diupdateProfile");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const data = await updatedUser({ id: currentUser.id, username, email, password });
      updateUser(data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="profileUpdatePage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" type="text" defaultValue={currentUser.username} />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" defaultValue={currentUser.email} />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
            <button>Update</button>
            {error && <span>error</span>}
          </form>
        </div>
        <div className="sideContainer">
          <img src={currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
        </div>
      </div>
    </>
  );
}
