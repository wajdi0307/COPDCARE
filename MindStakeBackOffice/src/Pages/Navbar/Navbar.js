import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <React.Fragment>

            <nav className="navbar navbar-light navbar-vertical navbar-expand-xl" >
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
                            <li className="nav-item">
                                {/* parent pages*/}
                                <Link
                                    className="nav-link"
                                    to='dashboard'
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
                            </li>
                            <li className="nav-item">
                                {/* label*/}
                                <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
                                    <div className="col-auto navbar-vertical-label">App</div>
                                    <div className="col ps-0">
                                        <hr className="mb-0 navbar-vertical-divider" />
                                    </div>
                                </div>
                                {/* parent pages*/}
                                <Link
                                    className="nav-link"
                                    to="admin"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-lock" />
                                        </span>
                                        <span className="nav-link-text ps-1">Admins</span>
                                    </div>
                                </Link>
                                <Link
                                    className="nav-link"
                                    to="users"
                                    role="button"
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-user" />
                                        </span>
                                        <span className="nav-link-text ps-1">Users</span>
                                    </div>
                                </Link>
                                {/* parent pages*/}
                               
                                {/* parent pages*/}
                                <a
                                    className="nav-link dropdown-indicator"
                                    href="#email"
                                    role="button"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                    aria-controls="email"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-lightbulb" />
                                        </span>
                                        <span className="nav-link-text ps-1">Projects</span>
                                    </div>
                                </a>
                                <ul className="nav collapse show false" id="email">
                                    
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to='/projectslist'
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="nav-link-text ps-1">Project list</span>
                                            </div>
                                        </Link>
                                        {/* more inner pages*/}
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to='/projects'
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="nav-link-text ps-1">Project cards</span>
                                            </div>
                                        </Link>
                                        {/* more inner pages*/}
                                    </li>
                                   
                                </ul>

                                {/* parent pages*/}
                                <a
                                    className="nav-link dropdown-indicator"
                                    href="#pay"
                                    role="button"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                    aria-controls="email"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-credit-card" />
                                        </span>
                                        <span className="nav-link-text ps-1">Payments</span>
                                    </div>
                                </a>
                                <ul className="nav collapse show false" id="pay">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to='/transactions'
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="nav-link-text ps-1">Transactions</span>
                                            </div>
                                        </Link>
                                        {/* more inner pages*/}
                                    </li>
                                    {/* <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="app/email/email-detail.html"
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="nav-link-text ps-1">Wallets</span>
                                            </div>
                                        </a>
                                        
                                    </li> */}
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to='/donations'
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <span className="nav-link-text ps-1">Donations</span>
                                            </div>
                                        </Link>
                                        {/* more inner pages*/}
                                    </li>
                                    
                                </ul>

                                {/* parent pages*/}
                                <Link
                                    className="nav-link"
                                    to='/packs'
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-tags" />
                                        </span>
                                        <span className="nav-link-text ps-1">Packs</span>
                                    </div>
                                </Link>

                                {/* parent pages*/}
                                <Link
                                    className="nav-link"
                                    to='/complaints'
                                    role="button"
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-question-circle" />
                                        </span>
                                        <span className="nav-link-text ps-1">Complaints</span>
                                    </div>
                                </Link>

                                {/* parent pages*/}
                                <Link
                                    className="nav-link"
                                    to='/companies'
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon">
                                            <span className="fas fa-building" />
                                        </span>
                                        <span className="nav-link-text ps-1">Companies</span>
                                    </div>
                                </Link>

                                

                            </li>
                            
                        </ul>

                    </div>
                </div>
            </nav>

        </React.Fragment>
    )
}
