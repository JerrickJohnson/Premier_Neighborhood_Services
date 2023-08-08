import React from 'react';
import './style.css';

function Home() {
  return (
    <div className="container-fluid">
      {/* Carousel for the images */}
      <div id="headerCarousel" className="carousel slide mt-4" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="/images/golf-community.jpg" alt="Section 1" />
            <div className="carousel-caption d-none d-sm-block">
              <h4>Welcome to Premier Neighborhood Services!</h4>
              <p className="lead">We offer the best services for our neighborhood, from local marketplaces to organizing events. Join us to explore more!</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/city-creek-park-as-it.jpg" alt="Section 2" />
            <div className="carousel-caption d-none d-sm-block">
              <h4>Homeowners Association Benefits</h4>
              <p className="lead">Our HOA is committed to ensuring that the beauty, safety, and stability of the area are maintained to the highest standard.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/FriscoParks-SDN-050219.jpg" alt="Section 3" />
            <div className="carousel-caption d-none d-sm-block">
              <h4>Amenities & Facilities</h4>
              <p className="lead">Discover the array of premium amenities offered within our community.</p>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#headerCarousel" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#headerCarousel" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

    {/* Welcome section */}
    <div className="row mt-2 justify-content-center text-center">
          <div className="col-md-10">
            <h1>Welcome to Premier Neighborhood Services!</h1>
            <p className="lead">We offer the best services for our neighborhood, from local marketplaces to organizing events. Join us to explore more!</p>
            <a href="/signup" className="btn btn-primary">Join Now</a>
          </div>
        </div>


    {/* Info sections */}
    <div className="row mt-4 align-items-center">
      {/* Image replacement for Welcome section */}
      <div className="col-md-6">
        <img src="/images/golf-course-home-large.jpg" alt="Premier Neighborhood" className="img-fluid welcome-image" />
      </div>
  
      {/* New content for HOA section */}
      <div className="col-md-6">
        <h4>Homeowners Association Benefits</h4>
        <p className="lead">
          Our HOA is committed to ensuring that the beauty, safety, and stability of the area are maintained to the highest standard. Benefits of our HOA include:
        </p>
        <ul className="text-muted">
          <li>Community events and gatherings</li>
          <li>Regular maintenance and landscaping</li>
          <li>Dispute resolutions and by-law enforcement</li>
          <li>Access to community amenities</li>
        </ul>
      <a href="/events" className="btn btn-primary">Events</a>
    </div>
  </div>

  <div className="row mt-4 align-items-center">
      <div className="col-md-6">
          <h4>Amenities & Services</h4>
          <p>
              Discover the array of premium amenities offered within our community. From a well-maintained golf course, serene parks, children's play areas, to community services, there's something for everyone.
          </p>
          <a href="/services" className="btn btn-primary">Explore Services</a>
      </div>
      <div className="col-md-6">
          <img src="/images/Golf-Course-Community1.jpeg" alt="Amenities & Facilities" className="img-fluid amenity-image" />
      </div>
  </div>

      {/* Upcoming Events section */}
      <div className="row mt-4">
        <div className="col">
          <h2>Upcoming Events</h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h4>Community Picnic</h4>
          <p>Join us for a fun and relaxing community picnic at the central park.</p>
          <p>Date: August 15, 2023</p>
          <a href="/events" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h4>Neighborhood Cleanup</h4>
          <p>We're organizing a neighborhood cleanup. Come lend a hand and make our community even more beautiful!</p>
          <p>Date: August 22, 2023</p>
          <a href="/events" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h4>Local Concert</h4>
          <p>A local band will be performing live at the community center.</p>
          <p>Date: September 1, 2023</p>
          <a href="/events" className="btn btn-primary">More Info</a>
        </div>
      </div>
    </div>
  );
}

export default Home;