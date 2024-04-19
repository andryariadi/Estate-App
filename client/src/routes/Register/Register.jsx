import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../libs/dataApi";

export default function Register() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [inputUser, setInputUser] = useState({
    username: "",
    email: "",
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
      await createUser(inputUser);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(inputUser, "<-----addinputUser");

  return (
    <>
      <div className="register">
        <div className="formContainer">
          <form onSubmit={handleSubmitUser}>
            <h1>Create an Account</h1>
            <input name="username" value={inputUser.username} onChange={handleChangeUser} type="text" placeholder="Username" />
            <input name="email" value={inputUser.email} onChange={handleChangeUser} type="text" placeholder="Email" />
            <input name="password" value={inputUser.password} onChange={handleChangeUser} type="password" placeholder="Password" />
            {error && <span>{error}</span>}
            <button disabled={isLoading}>Register</button>
            <Link to="/login">Do you have an account?</Link>
          </form>
        </div>
        <div className="imgContainer">
          <img src="/bg.png" alt="" />
        </div>
      </div>
    </>
  );
}
