import React from "react";
import { Dropdown, RenderImage } from "../components/Services";


function App() {

    const style = {
        backgroundColor: "grey",
        height: "100px",
      };
      const mediaQuery = "(min-width: 768px)";

      if (window.matchMedia(mediaQuery).matches) {
        style.height = "200px";
      }
    return (
      <div style={{ style }}>
        <Dropdown
          options={["Plumbing", "Electrical", "HVAC", "Carpentry", "Painting"] }
          style ={{backgroundColor: "orange", height: "100px", width: "200px" }}
        />
        <RenderImage />
      </div>
    );
  }
  
  
export default App;