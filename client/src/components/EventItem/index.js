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
        <div>it works</div>
        // <div className="card px-1 py-1">
        //         <div className="card-header">
        //             <h3 className="card-title">{name}</h3>
        //         </div>
        //         <div className="card-body">
        //             <p className="card-text">{description}</p>
        //             <p className="card-text">{date}</p>
        //             <p className="card-text">{location}</p>
        //             <p className="card-text">{host}</p>
        //             <p className="card-text">{attendees}</p>
        //             <p className="card-text">{isPublic}</p>
        //             <p className="card-text">{likes}</p>
        //         </div>
        // </div>
    );

}

export default EventItem;
