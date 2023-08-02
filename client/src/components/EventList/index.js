import React, { useEffect } from "react";
import EventItem from "../EventItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_EVENTS } from "../../utils/actions";
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function EventList() {
    return (
        <div className="container my-1">
        <div className="row mt-4">
        <div className="col">
          <h3>Upcoming Events</h3>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Community Picnic</h5>
          <p>Join us for a fun and relaxing community picnic at the central park.</p>
          <p>Date: August 15, 2023</p>
          <a href="/events/1" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Neighborhood Cleanup</h5>
          <p>We're organizing a neighborhood cleanup. Come lend a hand and make our community even more beautiful!</p>
          <p>Date: August 22, 2023</p>
          <a href="/events/2" className="btn btn-primary">More Info</a>
        </div>
        <div className="col-md-4">
          <h5>Local Concert</h5>
          <p>A local band will be performing live at the community center.</p>
          <p>Date: September 1, 2023</p>
          <a href="/events/3" className="btn btn-primary">More Info</a>
        </div>
      </div>
    </div>
    )
}

export default EventList;