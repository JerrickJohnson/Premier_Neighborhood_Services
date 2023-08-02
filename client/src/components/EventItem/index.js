import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

function EventItem(item) {
    const [state, dispatch] = useStoreContext();

    const {
        name,
        description,
        date,
        location,
        host,
        attendees,
        isPublic,
        likes
    } = item;

    return (
        <div className="col-md-4">
            <h5>{name}</h5>
            <p>{description}</p>
            <p>Date: {date}</p>
            <p>Location: {location}</p>
            <p>Likes: {likes}</p>
            {/* The attendee list will be saved for future development
                <ul>Attendees: {attendees.map((attendee) => (
                <li key={attendee._id}>{attendee.username}</li>
            ))}
            </ul> */}
            <a href="/events/1" className="btn btn-primary">More Info</a>
        </div>
    );
}

export default EventItem;
