import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Header() {

    const navigate = useNavigate();

    const connected = JSON.parse(localStorage.getItem('user'))
    console.log(connected)

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.pathname = "/login"
    }
    return (
        <React.Fragment>
            <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand" >
                <button
                    className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarVerticalCollapse"
                    aria-controls="navbarVerticalCollapse"
                    aria-expanded="false"
                    aria-label="Toggle Navigation"
                >
                    <span className="navbar-toggle-icon">
                        <span className="toggle-line" />
                    </span>
                </button>
                <a className="navbar-brand me-1 me-sm-3" href="index.html">
                    <div className="d-flex align-items-center">
                        <img
                            className="me-2"
                            src="assets/img/icons/spot-illustrations/falcon.png"
                            alt=""
                            width={40}
                        />
                        <span className="font-sans-serif">falcon</span>
                    </div>
                </a>
                <ul className="navbar-nav align-items-center d-none d-lg-block">
                    <li className="nav-item">
                        <div className="search-box" data-list='{"valueNames":["title"]}'>
                            <form
                                className="position-relative"
                                data-bs-toggle="search"
                                data-bs-display="static"
                            >
                                <input
                                    className="form-control search-input fuzzy-search"
                                    type="search"
                                    placeholder="Search..."
                                    aria-label="Search"
                                />
                                <span className="fas fa-search search-box-icon" />
                            </form>
                            <div
                                className="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                                data-bs-dismiss="search"
                            >
                                <div className="btn-close-falcon" aria-label="Close" />
                            </div>
                            <div className="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100">
                                <div className="scrollbar list py-3" style={{ maxHeight: "24rem" }}>
                                    <h6 className="dropdown-header fw-medium text-uppercase px-card fs--2 pt-0 pb-2">
                                        Suggested Filter
                                    </h6>
                                    <Link 
                                        className="dropdown-item fs--1 px-card py-1 hover-primary"
                                        to='projects'
                                    >
                                        <div className="d-flex align-items-center">
                                            <span className="fas fa-circle me-2 text-300 fs--2" />
                                            <div className="fw-normal title">
                                                Projects{" "}
                                                <span
                                                    className="fas fa-chevron-right mx-1 text-500 fs--2"
                                                    data-fa-transform="shrink-2"
                                                />{" "}
                                                Cards
                                            </div>
                                        </div>
                                    </Link>
                                    <Link 
                                        className="dropdown-item fs--1 px-card py-1 hover-primary"
                                        to='projectslist'
                                    >
                                        <div className="d-flex align-items-center">
                                            <span className="fas fa-circle me-2 text-300 fs--2" />
                                            <div className="fw-normal title">
                                                Projects{" "}
                                                <span
                                                    className="fas fa-chevron-right mx-1 text-500 fs--2"
                                                    data-fa-transform="shrink-2"
                                                />{" "}
                                                List
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                                <div className="text-center mt-n3">
                                    <p className="fallback fw-bold fs-1 d-none">No Result Found.</p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
                    <li className="nav-item">
                        <div className="theme-control-toggle fa-icon-wait px-2">
                            <input
                                className="form-check-input ms-0 theme-control-toggle-input"
                                id="themeControlToggle"
                                type="checkbox"
                                data-theme-control="theme"
                                defaultValue="dark"
                            />
                            <label
                                className="mb-0 theme-control-toggle-label theme-control-toggle-light"
                                htmlFor="themeControlToggle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title="Switch to light theme"
                            >
                                <span className="fas fa-sun fs-0" />
                            </label>
                            <label
                                className="mb-0 theme-control-toggle-label theme-control-toggle-dark"
                                htmlFor="themeControlToggle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="left"
                                title="Switch to dark theme"
                            >
                                <span className="fas fa-moon fs-0" color='green' />
                            </label>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <a
                            className="nav-link notification-indicator-primary px-0 fa-icon-wait"
                            id="navbarDropdownNotification"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span
                                className="fas fa-bell"
                                data-fa-transform="shrink-6"
                                style={{ fontSize: 33 }}
                            />
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end dropdown-menu-card dropdown-menu-notification"
                            aria-labelledby="navbarDropdownNotification"
                        >
                            <div className="card card-notification shadow-none">
                                <div className="card-header">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-auto">
                                            <h6 className="card-header-title mb-0">Notifications</h6>
                                        </div>
                                        <div className="col-auto ps-0 ps-sm-3">
                                            <a className="card-link fw-normal" href="#">
                                                Mark all as read
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="scrollbar-overlay" style={{ maxHeight: "19rem" }}>
                                    <div className="list-group list-group-flush fw-normal fs--1">
                                        <div className="list-group-title border-bottom">NEW</div>
                                        <div className="list-group-item">
                                            <a
                                                className="notification notification-flush notification-unread"
                                                href="#!"
                                            >
                                                <div className="notification-avatar">
                                                    <div className="avatar avatar-2xl me-3">
                                                        <img
                                                            className="rounded-circle"
                                                            src="assets/img/team/1-thumb.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="notification-body">
                                                    <p className="mb-1">
                                                        <strong>Emma Watson</strong> replied to your comment :
                                                        "Hello world 😍"
                                                    </p>
                                                    <span className="notification-time">
                                                        <span className="me-2" role="img" aria-label="Emoji">
                                                            💬
                                                        </span>
                                                        Just now
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="list-group-item">
                                            <a
                                                className="notification notification-flush notification-unread"
                                                href="#!"
                                            >
                                                <div className="notification-avatar">
                                                    <div className="avatar avatar-2xl me-3">
                                                        <div className="avatar-name rounded-circle">
                                                            <span>AB</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="notification-body">
                                                    <p className="mb-1">
                                                        <strong>Albert Brooks</strong> reacted to{" "}
                                                        <strong>Mia Khalifa's</strong> status
                                                    </p>
                                                    <span className="notification-time">
                                                        <span className="me-2 fab fa-gratipay text-danger" />
                                                        9hr
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="list-group-title border-bottom">EARLIER</div>
                                        <div className="list-group-item">
                                            <a className="notification notification-flush" href="#!">
                                                <div className="notification-avatar">
                                                    <div className="avatar avatar-2xl me-3">
                                                        <img
                                                            className="rounded-circle"
                                                            src="assets/img/icons/weather-sm.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="notification-body">
                                                    <p className="mb-1">
                                                        The forecast today shows a low of 20℃ in California. See
                                                        today's weather.
                                                    </p>
                                                    <span className="notification-time">
                                                        <span className="me-2" role="img" aria-label="Emoji">
                                                            🌤️
                                                        </span>
                                                        1d
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="list-group-item">
                                            <a
                                                className="border-bottom-0 notification-unread  notification notification-flush"
                                                href="#!"
                                            >
                                                <div className="notification-avatar">
                                                    <div className="avatar avatar-xl me-3">
                                                        <img
                                                            className="rounded-circle"
                                                            src="assets/img/logos/oxford.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="notification-body">
                                                    <p className="mb-1">
                                                        <strong>University of Oxford</strong> created an event :
                                                        "Causal Inference Hilary 2019"
                                                    </p>
                                                    <span className="notification-time">
                                                        <span className="me-2" role="img" aria-label="Emoji">
                                                            ✌️
                                                        </span>
                                                        1w
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="list-group-item">
                                            <a
                                                className="border-bottom-0 notification notification-flush"
                                                href="#!"
                                            >
                                                <div className="notification-avatar">
                                                    <div className="avatar avatar-xl me-3">
                                                        <img
                                                            className="rounded-circle"
                                                            src="assets/img/team/10.jpg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="notification-body">
                                                    <p className="mb-1">
                                                        <strong>James Cameron</strong> invited to join the group:
                                                        United Nations International Children's Fund
                                                    </p>
                                                    <span className="notification-time">
                                                        <span className="me-2" role="img" aria-label="Emoji">
                                                            🙋‍
                                                        </span>
                                                        2d
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer text-center border-top">
                                    <a
                                        className="card-link d-block"
                                        href="app/social/notifications.html"
                                    >
                                        View all
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className="nav-link pe-0"
                            id="navbarDropdownUser"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div className="d-flex d-flex align-items-center">
                                <div className="avatar avatar-xl me-2">
                                    <div className='rounded-circle avatar-name'>
                                        {/* {connected.ImageProfile !== "avatar.png" && <img src={`http://localhost:3000/uploads/images/${connected.ImageProfile}`} alt="admin" style={{ borderRadius: '50%' }} />} */}
                                        {/* <span style={{ color: 'white', zIndex: '999' }}>{connected.UserName.charAt(0).toUpperCase()}</span> */}
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-end py-0"
                            aria-labelledby="navbarDropdownUser"
                        >
                            <div className="bg-white dark__bg-1000 rounded-2 py-2">


                                <Link className="dropdown-item" to='/profile'>
                                    Profile &amp; account
                                </Link>

                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="pages/user/settings.html">
                                    Settings
                                </a>
                                <a
                                    className="dropdown-item"
                                    onClick={logout}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>

        </React.Fragment>
    )
}
