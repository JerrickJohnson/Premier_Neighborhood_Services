import React from "react";
import { RenderImage } from "../components/Services";



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
      
    return (
      <div style={{ style }}>     
        <RenderImage />
      </div>
    );
  }
  
  
export default App;