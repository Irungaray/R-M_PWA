import React, { useContext } from "react";

import ThemeContext from "../context/ThemeContext";

import "./styles/Header.css";

const Header = (props) => {
  const color = useContext(ThemeContext);

  return (
    <div className="Header">
      <h1 style={{ color }}>React Hooks</h1>
      <button type="button" onClick={() => props.onClick()}>
        {props.darkMode ? "Set Ligth Mode" : "Set Dark Mode"}
      </button>
    </div>
  );
};

export default Header;
