import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../libs/dataApi";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [inputUser, setInputUser] = useState({
    username: "",
    password: "",
  });

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "<----difunctionchange");
    setInputUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await loginUser(inputUser);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login">
        <div className="formContainer">
          <form onSubmit={handleSubmitUser}>
            <h1>Welcome back</h1>
            <input name="username" value={inputUser.username} onChange={handleChangeUser} type="text" placeholder="Username" />
            <input name="password" value={inputUser.password} onChange={handleChangeUser} type="password" placeholder="Password" />
            <button disabled={isLoading}>Login</button>
            {error && <span>{error}</span>}
            <Link to="/register">{"Don't"} you have an account?</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
    </>
  );
}
