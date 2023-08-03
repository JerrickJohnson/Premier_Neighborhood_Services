import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

function EventItem(item) {
    const [state, dispatch] = useStoreContext();

    const { isLiked } = state;

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
            <h5 style={{fontWeight: "bold"}}>{name}</h5>
            <p>{description}</p>
            <p>Date: {new Date(parseInt(date)).toLocaleDateString()}</p>
            <p>Time: {new Date(parseInt(date)).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
            <p>Location: {location}</p>
            {/* <p>Likes: {likes}</p> */}
            <a href="/events/1" className="btn btn-primary">More Info</a>
        </div>
    );
}

export default EventItem;
