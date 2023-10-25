import React, { useContext } from "react"; // import useContext
import { Link } from "react-router-dom";
import { ThemeContext } from "../App"; // Import ThemeContext

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Search</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="theme-switcher">
        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          <span className="theme-slider"></span>
        </label>
      </div>
    </>
  );
};

export default NavBar;
