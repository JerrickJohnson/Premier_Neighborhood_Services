import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';

function EditEvent(event) {

    const { id } = useParams();

    console.log(id);

    const { loading, data } = useQuery(QUERY_EVENT, { variables: { id: id }});

    console.log(data.event);

    const {
        _id,
        name,
        description,
        date,
        location,
    } = data.event;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <form>
                        <div>
                            <h1>Edit Event</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Event Name</label>
                            <input type="text" className="form-control" id="name" placeholder={name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Event Description</label>
                            <input type="text" className="form-control" id="description" placeholder={description} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Event Date and Time</label>
                            <input type="date" className="form-control" id="date" placeholder={date} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Event Location</label>
                            <input type="text" className="form-control" id="location" placeholder={location} />
                        </div>
                        <button type="submit" className="btn btn-primary my-2">
                            <Link to="/events" style={{color: "white"}}>Submit</Link>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditEvent;