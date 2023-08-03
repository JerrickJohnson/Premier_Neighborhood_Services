// import React, { useState } from "react";

function RenderImage() {
  const yourImage =
    "https://th.bing.com/th/id/OIP.sysd1ALHGvIToTPQHgtQyQHaHa?pid=ImgDet&w=700&h=700&rs=1";
  const yourImage2 =
    "https://th.bing.com/th/id/OIP.pFpOP5IMFzABuS6-5OvF1wHaHa?pid=ImgDet&w=185&h=185&c=7&dpr=1.6";

  const styleProp2 = {
    backgroundImage: `url(${yourImage})`,
    width: "100%",
    height: "500px",
    backgroudSize: "cover",
    color: "yellow",
    fontsize: "200px",
  };

  const styleProp3 = {
    backgroundImage: `url(${yourImage2})`,
    width: "100%",
    height: "500px",
    backgroudSize: "cover",
    color: "black",
  };

  const pGraph =
    "This is filler paragraph to show where everything will line up in the end filler ";

  const pGraph2 =(
    "Our landscape services include: John miller landscaping. This company has been serving the community for 30 years. " +
    "They are a family owned business that has been passed down from generation to generation. They specialize in lawn care, tree removal, and snow removal. " +
    "They are located in the heart of Detroit. They are a small business that is looking to expand.  "  +
    "They are looking to hire new employees. They are looking for people who are hard working and dedicated. " +  
    "They are looking for people who are willing to work long hours and are willing to work in all weather conditions. " +
    "They are looking for people who are willing to work in all weather conditions. " )  

  return (
    <div
      style={{ backgroundColor: "grey", height: "1000px" }} //background color is for testing purposes
      className="flex-row"
    >
      <h1>Our Affiliated Vendor Services </h1>

      <div style={styleProp2}>
        <div style={styleProp2}>
          <a href="https:google.com">
            <img
              style={{ height: "500px", width: "600px" }}
              img
              src="https://media.istockphoto.com/id/1205228815/photo/male-plumber-working-to-fix-leaking-sink-in-home-bathroom.jpg?b=1&s=612x612&w=0&k=20&c=apvWPotFrWiLWhQLoU1NrYyPCWrZ9f3z6N31dsyRv8k="
              alt="plumber pic"
            ></img>{" "}
          </a>
          {pGraph}
        </div>
      </div>

      <div style={styleProp3}>
        
          
    
          <a href="https:google.com">
            <img
              style={{ height: "500px", width: "65%x" }}
              img
              src="https://images.pexels.com/photos/1023404/pexels-photo-1023404.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="landscaping pic"
              className="image"
            ></img>{" "}
          </a>

        {pGraph2}

      </div>

      <div style={styleProp2}>
        <p>
          <div>
            <a href="https:yahoo.com">
              <img
                style={{ height: "500px", width: "600px" }}
                src="https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="electrician pic"
              ></img>
            </a>
            {pGraph}
          </div>
        </p>
      </div>

      <div className="flex-row"></div>
    </div> //background div
  );
}
export { RenderImage };
