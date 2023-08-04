import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";

function NewEventForm() {
    const [addEvent, { error }] = useMutation(ADD_EVENT);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value + " " + document.getElementById('time').value;
        const location = document.getElementById('location').value;
        
        try {
            const { data } = await addEvent({
            variables: { name, description, date, location }
        });
            } catch (err) {
                console.error(err);
            }   
        };

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
                            <label htmlFor="date">Event Date</label>
                            <input type="date" className="form-control" id="date" placeholder="Date" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="time">Event Time</label>
                            <input type="time" className="form-control" id="time" placeholder="Time" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Event Location</label>
                            <input type="text" className="form-control" id="location" placeholder="Location" />
                        </div>
                        <button type="submit" className="btn btn-primary my-2" onClick={handleSubmit}>
                            <Link to="/events" style={{color: "white"}}>Submit</Link>
                        </button>   
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewEventForm;