import React from "react";
import EventItem from "../EventItem";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { Link } from "react-router-dom";

function EventList() {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];

    return (
        <div className="container my-1">
            <div className="row mt-4">
                <div className="col">
                    <h3>Upcoming Events</h3>
                </div>
                <div className="col d-flex justify-content-end">
                <button className="btn btn-primary">
                    <Link to="/newevent" className="text-decoration-none" style={{color: "white"}}>New Event Form</Link> 
                    </button>
                </div>
            </div>
            {loading ? (
                <img src={spinner} alt="loading" />
            ) : (
                <div className="row mt-4 d-flex justify-content-center">
                    {events &&
                        events.map((event) => (
                            <EventItem
                                key={event._id}
                                _id={event._id}
                                name={event.name}
                                description={event.description}
                                date={event.date}
                                location={event.location}
                                host={event.host}
                                attendees={event.attendees}
                                isPublic={event.isPublic}
                                likes={event.likes}
                            />
                    ))}
                </div>
            )}
        </div>
    )

    // return (
    //     <div className="container my-1">
    //     <div className="row mt-4">
    //     <div className="col">
    //       <h3>Upcoming Events</h3>
    //     </div>
    //   </div>
    //   <div className="row mt-4">
    //     <div className="col-md-4">
    //       <h5>Community Picnic</h5>
    //       <p>Join us for a fun and relaxing community picnic at the central park.</p>
    //       <p>Date: August 15, 2023</p>
    //       <a href="/events/1" className="btn btn-primary">More Info</a>
    //     </div>
    //     <div className="col-md-4">
    //       <h5>Neighborhood Cleanup</h5>
    //       <p>We're organizing a neighborhood cleanup. Come lend a hand and make our community even more beautiful!</p>
    //       <p>Date: August 22, 2023</p>
    //       <a href="/events/2" className="btn btn-primary">More Info</a>
    //     </div>
    //     <div className="col-md-4">
    //       <h5>Local Concert</h5>
    //       <p>A local band will be performing live at the community center.</p>
    //       <p>Date: September 1, 2023</p>
    //       <a href="/events/3" className="btn btn-primary">More Info</a>
    //     </div>
    //   </div>
    // </div>
    // )
}

export default EventList;