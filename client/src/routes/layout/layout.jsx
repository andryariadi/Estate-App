import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./layout.scss";

export default function Layout() {
  return (
    <main className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}
