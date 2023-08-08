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

  const svg = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="house" width='150' height='70' fill ='red'>
  <path d="M50 19.95 34.09 30.79 20 40.39v50.4h32v-28c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v28h6v-50.4l-14.09-9.6L50 19.95zm-4 58.84c0 1.1-.9 2-2 2H28c-1.1 0-2-.9-2-2v-16c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v16zm0-26c0 1.1-.9 2-2 2H28c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12zm28-12v12c0 1.1-.9 2-2 2H56c-1.1 0-2-.9-2-2v-12c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-18 24h14v26H56v-26zm-26 8h12v4H30v-4zm0-8h12v4H30v-4zm0-22h12v8H30v-8zm40 8H58v-8h12v8zm21-12.41c0 1.28-.91 1.9-1.3 2.1-.86.46-1.86.41-2.67-.14l-35.9-24.46c-.68-.47-1.58-.47-2.26 0l-35.9 24.46c-.81.55-1.81.6-2.67.14-.39-.2-1.3-.82-1.3-2.1 0-.78.39-1.51 1.06-1.96L50 9.21l39.94 27.21c.67.45 1.06 1.18 1.06 1.96z"></path></svg>


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <Link className="navbar-brand" to="/">
        <span role="img" aria-label="shopping bag"></span> <h1 className="ml-2">{svg}Premier Neighborhood Services</h1>
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