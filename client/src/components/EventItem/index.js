import React from "react";

function EventItem(item) {

    const {
        name,
        description,
        date,
        location,
        // host,
        // attendees,
        // isPublic,
        // likes
    } = item;

    return (
        <div className="col-md-5 m-2 border border-primary rounded">
            <h5 style={{fontWeight: "bold"}}>{name}</h5>
            <p className="border-bottom ">{description}</p>
            <p>Date: {new Date(parseInt(date)).toLocaleDateString()}</p>
            <p>Time: {new Date(parseInt(date)).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
            <p>Location: {location}</p>
            {/* <p>Likes: {likes}</p> */}
            {/* <a href="/events/1" className="btn btn-primary">More Info</a> */}
        </div>
    );
}

export default EventItem;
