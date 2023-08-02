import React from 'react';

function Home() {
  return (
    <div className="container">
      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Welcome to Premier Neighborhood Services</h5>
            <p className="card-text">
              We offer the best services for our neighborhood, from local marketplaces to organizing events.
              Join us to explore more!
            </p>
            <a href="/signup" className="btn btn-primary">Join Now</a>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src="/images/golf-community.jpg" alt="Section 1" />
        </div>
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6 order-md-2">
          <div className="card-body">
            <h5 className="card-title">Section Title 2</h5>
            <p className="card-text">Section description 2...</p>
          </div>
        </div>
        <div className="col-md-6 order-md-1">
          <img className="img-fluid" src="/images/city-creek-park-as-it.jpg" alt="Section 2" />
        </div>
      </div>

      <div className="row mt-4 align-items-center">
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Section Title 3</h5>
            <p className="card-text">Section description 3...</p>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src="/images/FriscoParks-SDN-050219.jpg" alt="Section 3" />
        </div>
      </div>

      {/* Upcoming Events section */}
      <div className="row mt-4">
        <div className="col">
          <h3>Upcoming Events</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Community Picnic</h5>
          <p>Join us for a fun and relaxing community picnic at the central park.</p>
          <p>Date: August 15, 2023</p>
          <a href="/events/1" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Neighborhood Cleanup</h5>
          <p>We're organizing a neighborhood cleanup. Come lend a hand and make our community even more beautiful!</p>
          <p>Date: August 22, 2023</p>
          <a href="/events/2" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Local Concert</h5>
          <p>A local band will be performing live at the community center.</p>
          <p>Date: September 1, 2023</p>
          <a href="/events/3" className="btn btn-primary">More Info</a>
        </div>
      </div>
    </div>
  );
}

export default Home;