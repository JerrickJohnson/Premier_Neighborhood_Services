import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";
import './style.css';

function ProductItem(item) {
    const [state, dispatch] = useStoreContext();

    const {
        _id,
        name,
        description,
        date,
        location,
        host,
        attendees,
        isPublic,
        likes,
        comments
    } = event;

    return (
        <div className="card px-1 py-1">
            <Link to={`/events/${_id}`}>
                <div className="card-header">
                    <h3 className="card-title">{name}</h3>
                </div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                    <p className="card-text">{date}</p>
                    <p className="card-text">{location}</p>
                    <p className="card-text">{host}</p>
                    <p className="card-text">{attendees}</p>
                    <p className="card-text">{isPublic}</p>
                    <p className="card-text">{likes}</p>
                    <p className="card-text">{comments}</p>
                </div>
            </Link>
        </div>
    );

}

export default ProductItem;
