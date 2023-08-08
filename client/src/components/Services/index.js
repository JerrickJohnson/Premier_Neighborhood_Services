
function RenderImage() {
  const yourImage =
    "https://media.istockphoto.com/id/1205228815/photo/male-plumber-working-to-fix-leaking-sink-in-home-bathroom.jpg?b=1&s=612x612&w=0&k=20&c=apvWPotFrWiLWhQLoU1NrYyPCWrZ9f3z6N31dsyRv8k=";
  const yourImage2 =
    "https://images.pexels.com/photos/1023404/pexels-photo-1023404.jpeg?auto=compress&cs=tinysrgb&w=600";

    const yourImage3 =
    "https://images.pexels.com/photos/8005397/pexels-photo-8005397.jpeg?auto=compress&cs=tinysrgb&w=600";


  return (
    <div className="container" >
      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Plumber Station</h5>
            <p className="card-text">
              We offer the best services for our neighborhood. For routine serive request, please click the button below.
              
            </p>
            <a href="/servicerequests" className="btn btn-primary">Service Request</a>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={yourImage} alt="Section 1" />
        </div>
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6 order-md-2">
          <div className="card-body">
            <h5 className="card-title">Exterior Area Maintenance</h5>
            <p className="card-text">Exterior repairs, fall tree and other nature effects, routine lawn serice</p>
            <a href="/servicerequests" className="btn btn-primary">Service Request</a>
          </div>
        </div>
        <div className="col-md-6 order-md-1">
          <img className="img-fluid" src={yourImage2} alt="Section 2" />
        </div>
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Electrical Issues</h5>
            <p className="card-text">Our partnered service provider will respond within 2 hours of any service call. Please contact us if you are having issues</p>
            <a href="/servicerequests" className="btn btn-primary">Service Request</a>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={yourImage3} alt="Section 3" />
        </div>
      </div>

          {/* Affliated links to service providers */}
          <div className="row mt-4">
        <div className="col mt-2"
            style={{backgroundColor: "grey"}}>
          <h3>Service Providers Affliated Links</h3>
        </div>
      </div>
      <div className="row mt-4"
        style={{backgroundColor: "lightgray"}}>
        <div className="col-md-4">
          <h5>United Plumbers</h5>
          <p>Plumbing service provided. Customer service and quality guaranteed.</p>
          
          <a href="https:google.com" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Twisting Meadows Landscapping</h5>
          <p>Our goal is to make this community even more beautiful!</p>
         
          <a href="https:google.com" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Hardwire Your Wiring Company</h5>
          <p>A local service provided working for the community for years!.</p>
          
          <a href="https:google.com" className="btn btn-primary">More Info</a>
        </div>
    </div>
    </div>
    );
}

export { RenderImage };
