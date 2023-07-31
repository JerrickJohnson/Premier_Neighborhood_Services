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
    const styleProp = {
        backgroundColor: "teal", height: "500px", width: "400px", color:"black"}


    const pGraph ="This is filler paragraph to show where everything will line up in the end filler " 

  return (
    <div
      style={{ backgroundColor: "grey", height: "1000px" }} //background color is for testing purposes
      className="flex-row"
    >
      <h1>--Affliated vendors recommeded by Premier Neighborhood Services fillerfillerfillerfillerfillerfiller</h1>
      <div style={ styleProp } >
      <p>
        {pGraph}
      </p>

      </div>

        <div style={ styleProp} >
        <p>
            {pGraph}
        </p>
        </div>

        <div style={styleProp}>
        <p>
            {pGraph}
        </p>
        </div>

      <div className="flex-row"> 
        <div>
            <a href="https:google.com">
          <img src="images/plumbing-service.jpg" alt="plumber pic"></img> </a>
        </div>

        <div>
            <a href="https:yahoo.com">
          <img style={{height:"65%" ,width: "400px"}} src="images/electric-service.jpg" alt="electrician pic"></img>
            </a>
        </div>
      </div>

    </div>//background div
  );
}
export  {Dropdown, RenderImage};
