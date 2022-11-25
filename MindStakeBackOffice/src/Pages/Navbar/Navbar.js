import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const connected = JSON.parse(localStorage.getItem('user'))
  console.log("hello", connected.user.Role);
  return (
    <React.Fragment>
      <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
        <div className="d-flex align-items-center">
          <div className="toggle-icon-wrapper">
            <button
              className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="Toggle Navigation"
            >
              <span className="navbar-toggle-icon">
                <span className="toggle-line" />
              </span>
            </button>
          </div>
          <a className="navbar-brand" href="index.html">
            <div className="d-flex align-items-center py-3">
              <img
                className="me-2"
                src="assets/img/logo2.png"
                alt=""
                width={150}
              />
              {/* <span className="font-sans-serif">falcon</span> */}
            </div>
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div className="navbar-vertical-content scrollbar">
            <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
            {(connected.user.Role == "DOCTOR" || connected.user.Role == "ADMIN"  ) && <li className="nav-item">
                {/* parent pages*/}
                <Link
                  className="nav-link"
                  to="dashboard"
                  role="button"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span className="fas fa-chart-pie" />
                    </span>
                    <span className="nav-link-text ps-1">Dashboard</span>
                  </div>
                </Link>
              </li>}
              <li className="nav-item">
                {/* label*/}
                <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
                  <div className="col-auto navbar-vertical-label">App</div>
                  <div className="col ps-0">
                    <hr className="mb-0 navbar-vertical-divider" />
                  </div>
                </div>
                {/* parent pages*/}
     {      (connected.user.Role == "DOCTOR" || connected.user.Role == "ADMIN"  ) &&     <Link
                  className="nav-link"
                  to="admin"
                  role="button"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                      <span className="fas fa-lock" />
                    </span>
                    <span className="nav-link-text ps-1">Patients</span>
                  </div>
                </Link>}
          
                {/* parent pages*/}

             

          
           

            

          

        
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
