import React from "react";
// import { Link } from "react-router-dom";

// import { useQuery } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";

import Image from "react-image";

function App() {
  return (
    <Image
      src="./public/images/soap.jpg"
      alt="image"
      loader={<div>Loading...</div>}
      unloader={<div>Error!</div>}
    >
      {(props) => (
        <div style={{ position: "relative" }}>
          <img {...props} alt="image2" />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Text on Image
          </div>
        </div>
      )}
    </Image>
  );
}

export default App;