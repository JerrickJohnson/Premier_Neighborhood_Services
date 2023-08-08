import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_EVENT } from '../../utils/queries';
import { EDIT_EVENT } from '../../utils/mutations';

function EditEvent() {

    const { id } = useParams();

    const [editEvent, { error }] = useMutation(EDIT_EVENT);

    function handleSubmit(e) {
        e.preventDefault();

        const formName = document.getElementById('name').value;
        const formDescription = document.getElementById('description').value;
        const formDate = document.getElementById('date').value + " " + document.getElementById('time').value;
        const formLocation = document.getElementById('location').value;

        console.log(formName, formDescription, formDate, formLocation);
            try {
                const { data } = editEvent({
                    variables: { id, formName}
                });
            } catch (err) {
                console.error(err);
            }
        
    }

    const { loading, data } = useQuery(QUERY_EVENT, { variables: { id: id }});

    if (loading) {
        return <div>Loading...</div>
    } else {
        const {
            _id,
            name,
            description,
            date,
            location,
            attendees
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
                                <label htmlFor="name">Event Name: {name}</label>
                                <input type="text" className="form-control" id="name" placeholder="New name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Event Description: {description}</label>
                                <input type="text" className="form-control" id="description" placeholder="New description" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Event Date: {new Date(parseInt(date)).toLocaleDateString()}</label>
                                <input type="date" className="form-control" id="date" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Event Time: {new Date(parseInt(date)).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</label>
                                <input type="time" className="form-control" id="time" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="location">Event Location: {location}</label>
                                <input type="text" className="form-control" id="location" placeholder="New location" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="attendees">Event Attendees: {attendees}</label>
                                <input type="text" className="form-control" id="attendees" placeholder="New attendees" />
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
    // console.log(data.event);

    

    // const [editEvent, { error }] = useMutation(EDIT_EVENT);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const name = document.getElementById('name').value;
    //     const description = document.getElementById('description').value;
    //     const date = document.getElementById('date').value + " " + document.getElementById('time').value;
    //     const location = document.getElementById('location').value;

    //     try {
    //         const { data } = await editEvent({
    //             variables: { name, description, date, location }
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // if (data) {
    //     console.log(data);
    //     const {
    //         _id,
    //         name,
    //         description,
    //         date,
    //         location,
    //     } = data.event;

        
    // }
    
}

export default EditEvent;