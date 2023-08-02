import React, { useEffect } from "react";
import EventItem from "../EventItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EVENTS } from "../../utils/actions";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";

function EventList() {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_EVENTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_EVENTS,
                events: data.events,
            });
            data.events.forEach((event) => {
                idbPromise("events", "put", event);
            });
        } else if (!loading) {
            idbPromise("events", "get").then((events) => {
                dispatch({
                    type: UPDATE_EVENTS,
                    events: events,
                });
            });
        }
    }, [data, loading, dispatch]);

    return (
        <div className="my-2">
            <h2>Our Events:</h2>
            {state.events.length ? (
                <div>
                    {state.events.map((event) => (
                        <EventItem
                            key={event._id}
                            _id={event._id}
                            name={event.name}
                            description={event.description}
                            date={event.date}
                            location={event.location}
                            host={event.host}
                            attendees={event.attendees}
                            isPublic={event.isPublic}
                            likes={event.likes}
                            comments={event.comments}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any events yet!</h3>
            )}
            {loading ? <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default EventList;