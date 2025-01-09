import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import LogoBig from "../assets/Logo-big.png";
import LogoSmall from "../assets/small-logo.png";

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={LogoBig}
            alt="aaMOBee Logo Large"
            loading="lazy"
            className="d-none d-md-block"
            style={{ maxHeight: "50px" }}
          />
          <img
            src={LogoSmall}
            alt="aaMOBee Logo Small"
            loading="lazy"
            className="d-block d-md-none"
            style={{ maxHeight: "50px" }}
          />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="featuresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Features
              </a>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                <li>
                  <a className="dropdown-item" href="#invoicing">
                    Invoicing
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#inventory">
                    Inventory Management
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#manufacturing">
                    Manufacturing
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="pricingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pricing
              </a>
              <ul className="dropdown-menu" aria-labelledby="pricingDropdown">
                <li>
                  <a className="dropdown-item" href="#mission">
                    Mission
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#team">
                    Our Team
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#vision">
                    Vision
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="smallBusinessesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                For Small Businesses
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="smallBusinessesDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#support">
                    Support
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#feedback">
                    Feedback
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="accountantsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                For Accountants & Bookkeepers
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="accountantsDropdown"
              >
                <li>
                  <a className="dropdown-item" href="#support">
                    Support
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#feedback">
                    Feedback
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="supportDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Support
              </a>
              <ul className="dropdown-menu" aria-labelledby="supportDropdown">
                <li>
                  <a className="dropdown-item" href="#support">
                    Support
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#feedback">
                    Feedback
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown w-25">
              <a className="nav-link" href="/login-forwarding">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
