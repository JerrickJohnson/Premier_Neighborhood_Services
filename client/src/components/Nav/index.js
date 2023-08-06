import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/message">
              Messages
            </Link>
          </li>

          <li className="mx-1">
            <Link to="/marketplace">
              Marketplace
            </Link>
          </li>

          <li className="mx-1">
            <Link to="/events">
              Events
            </Link>
          </li>
          
        {/* added services button link */}
          <li className="mx-1">
            <Link to="/services">
              Services
            </Link>
          </li>
          {/* added payments button link */}
          <li className="mx-1">
            <Link to="/payments">
              Payments
            </Link>
          </li>

          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
          <span role="img" aria-label="shopping bag">🛍️</span>
          PNS
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
