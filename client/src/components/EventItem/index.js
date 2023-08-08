import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { EDIT_EVENT } from '../../utils/mutations';

const EventItem = (item) => {
    
    const {
        _id,
        name,
        description,
        date,
        location,
        attendees
    } = item;

    const [attendeesCount, setAttendeesCount] = useState(attendees);

    const [editEvent, { error }] = useMutation(EDIT_EVENT);

    const rsvp = async (e) => {
        
        const id = e.target.id;
        e.preventDefault();
        const newAttendees = attendees + 1;
        setAttendeesCount(newAttendees);

        try {
            const { data } = await editEvent({
                variables: { id: id, attendees: newAttendees }
            });
        } catch (err) {
            console.error(err);
        }
    }




    return (
        <div className="col-md-5 m-2 border border-primary rounded">
            <h5 style={{fontWeight: "bold"}}>{name}</h5>
            <p className="border-bottom ">{description}</p>
            <p>Date: {new Date(parseInt(date)).toLocaleDateString()}</p>
            <p>Time: {new Date(parseInt(date)).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
            <p>Location: {location}</p>
            <p>Attending: {attendeesCount}</p>
            <div className="d-flex justify-content-center">
            <button id={_id} className="btn btn-primary mb-2" onClick={rsvp}>RSVP</button>
            </div>
            {/* <p>Likes: {likes}</p> */}
            {/* <a href="/events/1" className="btn btn-primary">More Info</a> */}
        </div>
    );
}

export default EventItem;
