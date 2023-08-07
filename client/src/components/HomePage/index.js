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
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/city-creek-park-as-it.jpg" alt="Section 2" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="/images/FriscoParks-SDN-050219.jpg" alt="Section 3" />
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
   <div className="row mt-5 justify-content-center text-center">
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
    <h5>Homeowners Association Benefits</h5>
    <p>
      Our HOA is committed to ensuring that the beauty, safety, and stability of the area are maintained to the highest standard. Benefits of our HOA include:
      <ul>
        <li>Community events and gatherings</li>
        <li>Regular maintenance and landscaping</li>
        <li>Dispute resolutions and by-law enforcement</li>
        <li>Access to community amenities</li>
      </ul>
    </p>
    <a href="/hoa-info" className="btn btn-primary">Learn More</a>
  </div>
</div>

<div className="row mt-4 align-items-center">
    <div className="col-md-6">
        <h5>Amenities & Facilities</h5>
        <p>
            Discover the array of premium amenities offered within our community. From a well-maintained golf course, serene parks, children's play areas, to state-of-the-art gym facilities, there's something for everyone.
        </p>
        <a href="/amenities" className="btn btn-primary">Explore Amenities</a>
    </div>
    <div className="col-md-6">
        <img src="/images/Golf-Course-Community1.jpeg" alt="Amenities & Facilities" className="img-fluid amenity-image" />
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