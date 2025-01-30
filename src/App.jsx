import React, { useState } from "react";
import ThreeScene from "./threejs/threeScene";
import "./App.css";

const App = () => {
  const [shaderActive, setShaderActive] = useState(false);

  const handleClick = () => {
    setShaderActive((prev) => !prev); // Toggle shader state
  };

  return (
    <div>
      <h1 className="name">Simas Safronovas</h1>
      <img
        id="underConstruction"
        src="/assets/UnderConstruction.png"
        className={`underConstruction ${shaderActive ? "clicked" : ""}`}
        onClick={handleClick}
        alt="Under Construction"
      />
      <ThreeScene shaderActive={shaderActive} /> {/* ✅ Pass prop */}
    </div>
  );
};

export default App;
