import React from "react";
import "../Styles/TypeArena.css";
import NavBar from "./NavBar";
import Home from "./Home";

const TypeArena = () => {
  return (
      <div className="TypeArena">
        <NavBar />
        <div className="Screens">
            <Home/>
        </div>
      </div>
  );
};

export default TypeArena;
