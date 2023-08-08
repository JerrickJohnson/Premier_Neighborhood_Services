import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import './style.css';

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/message">Messages</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/marketplace">Marketplace</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/events">Events</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/services">Services</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/payments">Payments</Link>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/" onClick={() => Auth.logout()}>Logout</a>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Signup</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <Link className="navbar-brand" to="/">
        <span role="img" aria-label="shopping bag"></span> <h1 className="ml-2">Premier Neighborhood Services</h1>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {showNavigation()}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;