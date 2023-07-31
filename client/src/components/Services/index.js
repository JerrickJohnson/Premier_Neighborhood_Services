import React, { useState } from "react";

function Dropdown({ options }) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
function RenderImage() {
  return (
    <div
      style={{ backgroundColor: "grey", height: "1000px" }} //background color is for testing purposes
      className="flex-row"
    >
      <h1>--Affliated vendors recommeded by Premier Neighborhood Services</h1>
      <div style={{ backgroundColor: "black", height: "500px", width: "400px", color:"white" }} >
      <p>
        This is filler paragrahp to show where everythign will line up in the
        end
      </p>

      </div>

        <div style={{ backgroundColor: "teal", height: "500px", width: "400px", color:"white" }}>
        <p>
            This is filler paragrahp to show where everythign will line up in the
            end
        </p>
        </div>

        <div style={{ backgroundColor: "teal", height: "500px", width: "400px", color:"white" }}>
        <p>
            This is filler paragrahp to show where everythign will line up in the
            end
        </p>
        </div>

      <div className="flex-row"> 
        <div>
          <img src="images/plumbing-service.jpg" alt="plumber pic"></img>
        </div>

        <div>
          <img style={{height:"65%" ,width: "400px"}} src="images/electric-service.jpg" alt="electrician pic"></img>
        </div>
      </div>

    </div>//background div
  );
}
export  {Dropdown, RenderImage};
