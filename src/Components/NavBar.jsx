import React from "react";
import "../Styles/Navbar.css";
import { RiMenuFoldLine } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="Navbar">
      <div className="Logo ptr"></div>
      <div className="Menu ptr">
        <RiMenuFoldLine/>
      </div>
    </nav>
  );
};

export default NavBar;
