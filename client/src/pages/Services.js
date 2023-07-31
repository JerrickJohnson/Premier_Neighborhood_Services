import React from "react";
import { Dropdown, RenderImage } from "../components/Services";
// import { useState } from "react";


function App() {

    const style = {
        backgroundColor: "grey",
        height: "100px",
        animationName: "example",
    animationDuration: "4s",
      };
      const mediaQuery = "(min-width: 768px)";

      if (window.matchMedia(mediaQuery).matches) {
        style.height = "200px";
      }
const options = ["Plumbing", "Electrical", "HVAC", "Carpentry", "Painting"];

    

      
    return (
      <div style={{ style }}>
        <Dropdown
          options={options }
          style ={{backgroundColor: "orange", height: "100px", width: "200px" }}
        />
        <RenderImage />
      </div>
    );
  }
  
  
export default App;