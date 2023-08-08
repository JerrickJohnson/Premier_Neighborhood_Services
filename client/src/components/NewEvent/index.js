import React from "react";
import { Link } from "react-router-dom";

function NewEventForm() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">     
                    <form>
                        <div>
                            <h1>New Event</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Event Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Event Description</label>
                            <input type="text" className="form-control" id="description" placeholder="Description" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Event Date and Time</label>
                            <input type="text" className="form-control" id="date" placeholder="Date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Event Location</label>
                            <input type="text" className="form-control" id="location" placeholder="Location" />
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

export default NewEventForm;