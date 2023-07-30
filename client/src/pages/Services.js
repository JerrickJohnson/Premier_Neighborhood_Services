import React from "react";
// import { Link } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";

import Image from "react-image";

function App() {
  return (
    <Image
      src="../public/images/soaps.jpg"
      alt="image"
      loader={<div>Loading...</div>}
      unloader={<div>Error!</div>}
    >
      {(props) => (
        <div style={{ position: "relative" }}>
          {/* <img {...props} alt="image" /> */}
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h1>Services</h1>
          </div>
          
        </div>
      )}
    </Image>
  );
}

export default App;