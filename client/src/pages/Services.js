import React from "react";
import { Dropdown, RenderImage } from "../components/Services";
// import { Link } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";

// import Image from "react-image";

function App() {
    return (
      <div style={{ backgroundColor: "grey", height: "100px" }}>
        <Dropdown
          options={["Plumbing", "Electrical", "HVAC", "Carpentry", "Painting"] }
          style ={{backgroundColor: "orange", height: "100px", width: "200px" }}
        />
        <RenderImage />
      </div>
    );
  }
  
  
export default App;