import { useContext, useState } from "react";
import "./navbar.scss";
import { RiMenu5Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../libs/notificationStore";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <>
      <nav>
        <div className="left">
          <Link className="logo" to="/">
            <img src="/logo.svg" alt="estate" />
          </Link>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/">
            About
          </Link>
          <Link className="nav-link" to="/">
            Contact
          </Link>
          <Link className="nav-link" to="/">
            Agents
          </Link>
        </div>

        <div className="right">
          {currentUser ? (
            <div className="user">
              <Link to="/profile" className="profileImg">
                <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                <span>{currentUser.username}</span>
              </Link>
              <Link to="/profile" className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="login">
                Sign In
              </Link>
              <Link to="/register" className="register">
                Sign Up
              </Link>
            </>
          )}

          {/* sidebar */}
          <div className="menuIcon" onClick={() => setOpen(!open)}>
            {/* <img src="/menu.png" alt="menu" /> */}
            {open ? (
              <div className="close">
                <CgClose size={35} color="#fff" />
              </div>
            ) : (
              <div className="berger">
                <RiMenu5Fill size={35} color="#fff" />
              </div>
            )}
          </div>

          <div className={open ? "menu active" : "menu"}>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/">
              About
            </Link>
            <Link className="nav-link" to="/">
              Contact
            </Link>
            <Link className="nav-link" to="/">
              Agents
            </Link>
            {currentUser ? (
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Sign In
                </Link>
                <Link className="nav-link" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
