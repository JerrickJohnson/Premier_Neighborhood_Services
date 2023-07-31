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
    <div  style={{ backgroundColor: 'grey', height: '1000px' }} className="flex-row" >
        <h1>Services</h1>
        <div className="flex-row"> </div>
        <div>
        <img src='images/plumbing-service.jpg' alt='soap'></img>
      </div>
    </div> 
    );
}
export  {Dropdown, RenderImage};
