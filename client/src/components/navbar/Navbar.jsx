import { useState } from "react";
import "./navbar.scss";
import { RiMenu5Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const user = true;

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
          {user ? (
            <div className="user">
              <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
              <span>John Doe</span>
              <Link to="/profile" className="profile">
                <div className="notification">3</div>
                <span>Profile</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/" className="login">
                Sign In
              </Link>
              <Link to="/" className="register">
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
            <Link className="nav-link" to="/">
              Sign In
            </Link>
            <Link className="nav-link" to="/">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
