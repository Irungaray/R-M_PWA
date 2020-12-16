import React, { useState } from "react";

import Header from "./components/Header";
import Characters from "./components/Characters";

import "./styles/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "App DarkMode" : "App LigthMode"}>
      <Header darkMode={darkMode} onClick={() => setDarkMode(!darkMode)} />

      <Characters />
    </div>
  );
}

export default App;
