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
}

export default EventList;