import { NavLink } from "react-router-dom";
import "./styles.css";
import "../main.css";

export function NavBar() {
  return (
    <nav className="navbar-container relative container mx-auto bg-red-500">
      <NavLink to="/" className="bg-sky-600 hover:bgsky-700">
        Home
      </NavLink>
      <NavLink to="/salaries">Salaries</NavLink>{" "}
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
