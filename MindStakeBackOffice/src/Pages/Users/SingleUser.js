import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import UserDetails from './UserDetails.js';

export default function SingleUser(props) {

    const { id } = useParams()

    const [empty, setEmpty] = useState({});

    const [showModal, setShowModal] = useState(false);


    const [user, setUser] = useState(props.user);

    const [user1, setUser1] = useState([]);

    //setUser1({...user1,user})
    //const user1 = []
    //user1.push(user)
    //console.log(user1)

    const [userDetails, setUserDetails] = useState();

    var date = new Date(parseInt(user._id.toString().slice(0, 8), 16) * 1000);
    var CreateDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', day: 'numeric', month: 'numeric' }).format(date)


    // const clickDetails = () => {
    //     //console.log(id)
    //     // id1 = id;
    //     console.log(user._id)
    //      axios.get(`http://localhost:3000/users/${user._id}`)
    //         .then(res => {
    //             console.log(res.data[0])
    //             setUserDetails(res.data[0]);
    //             console.log(userDetails)
    //         })
    // }

    const clickDetails = () => {
        //setUserDetails(empty)
        setUserDetails(user)
        //console.log(user)
        setShowModal(true)
    }




    return (
        <React.Fragment>
            <tr className="btn-reveal-trigger">
                
                <td className="name align-middle white-space-nowrap py-2">
                    <a href="../../app/e-commerce/customer-details.html">
                        <div className="d-flex d-flex align-items-center">
                            <div className="avatar avatar-xl me-2">
                                <div className="avatar-name rounded-circle">
                                    {user.ImageProfile !== "avatar.png" && <img src={`https://storage.googleapis.com/mindstake_bucket/${user.ImageProfile}`} alt="user" style={{ borderRadius: '50%' }} />}

                                    {user.ImageProfile === "avatar.png" && <span>{user.UserName.charAt(0).toUpperCase()}</span>}
                                </div>
                            </div>
                            <div className="flex-1">
                                <h5 className="mb-0 fs--1" id="username">{user.UserName}</h5>
                            </div>
                        </div>
                    </a>
                </td>
                <td className="email align-middle py-2">
                    <a href={`mailto:${user.Email}`} style={{color:'green'}}>{user.Email}</a>
                </td>
                <td className="phone align-middle white-space-nowrap py-2">
                    <a href={`tel:${user.Phone}`} style={{color:'green'}}>{user.Phone}</a>
                </td>

                <td className="joined align-middle py-2">{user.Role}</td>
                <td className="joined align-middle py-2">{CreateDate}</td>

                <td className="align-middle white-space-nowrap py-2 text-end">
                    <div className="dropdown font-sans-serif position-static">
                        <button
                            className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal"
                            type="button"
                            id="customer-dropdown-0"
                            data-bs-toggle="dropdown"
                            data-boundary="window"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <svg
                                className="svg-inline--fa fa-ellipsis-h fa-w-16 fs--1"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="ellipsis-h"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                data-fa-i2svg=""
                            >
                                <path
                                    fill="currentColor"
                                    d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                                />
                            </svg>
                            {/* <span class="fas fa-ellipsis-h fs--1"></span> Font Awesome fontawesome.com */}
                        </button>
                        <div
                            className="dropdown-menu dropdown-menu-end border py-0"
                            aria-labelledby="customer-dropdown-0"
                        >
                            <div className="bg-white py-2">

                                <button onClick={clickDetails} className="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target="#userDetails" data-backdrop="static" data-keyboard="false">
                                    <Link className="dropdown-item" to={"/users/" + user._id} style={{ marginLeft: '-17px' }}>Details
                                    </Link>

                                </button>

                                <a className="dropdown-item text-danger" href="#!">
                                    Ban
                                </a>
                                <a className="dropdown-item text-danger" href="#!">
                                    Block
                                </a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>

            {showModal &&
                <UserDetails user={user}/>
            }




        </React.Fragment>
    )
}

