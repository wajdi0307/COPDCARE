import { clear } from '@testing-library/user-event/dist/clear';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosconfig from '../../axiosConfig'

export default function UserDetails() {

    const { id } = useParams()


    const [userDetails, setUserDetails] = useState({});

    //{console.log(userDetails)}
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(id)
                const { data: response } = await axiosconfig.get(`/users/${id}`);
                //const data = await setUserDetails(response)
                console.log(response[0])
                if (response[0] !== "") {
                    //userDetails.clear()
                    setUserDetails(response[0])
                }


            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(userDetails);
    }, []);



    return (
        <React.Fragment>
            <div
                className="modal fade"
                id="userDetails"
                tabIndex={-1}
                role="dialog"
                aria-hidden="false"
                aria-labelledby="staticBackdropLabel"
                data-bs-keyboard="false"
                data-bs-backdrop="static"

            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    style={{ maxWidth: 500 }}
                >
                    <div className="modal-content position-relative " style={{ display: 'flex', justifyContent: 'flex-start', textAlign: 'left' }}>
                        <div className="position-absolute top-0 end-0 mt-2 me-2 z-index-1">
                            <button
                                className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <Link to='/users'>&nbsp;</Link>
                            </button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                                <h4 className="mb-1" id="modalExampleDemoLabel">
                                    User's profile
                                </h4>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header position-relative min-vh-25 mb-7">
                                    <div
                                        className="bg-holder rounded-3 rounded-bottom-0"
                                        style={{ backgroundImage: "url(../assets/img/generic/4.jpg)" }}
                                    />
                                    {/*/.bg-holder*/}
                                    <div className="avatar avatar-5xl avatar-profile" >
                                        {/* {userDetails.ImageProfile !== "avatar.png" && <img className="rounded-circle img-thumbnail shadow-sm" src={`http://localhost:3000/uploads/images/${userDetails.ImageProfile}`} alt="user" style={{ borderRadius: '50%', width: '200px', marginLeft: '82%' }} />}

                                        {userDetails.ImageProfile === "avatar.png" && <span>{userDetails.UserName.charAt(0).toUpperCase()}</span>}  */}
                                    </div>
                                </div>
                                <div className="card-body" style={{ marginLeft: '20%', textAlign: 'center', width: '350px' }}>
                                    <div className="row">
                                        <div className="col-lg-10">
                                            <h4 className="mb-1">
                                                {userDetails.UserName}{console.log(userDetails)}
                                                <span
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="right"
                                                    title=""
                                                    data-bs-original-title="Verified"
                                                    aria-label="Verified"
                                                >
                                                    <svg
                                                        className="svg-inline--fa fa-check-circle fa-w-16 text-primary"
                                                        data-fa-transform="shrink-4 down-2"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        data-prefix="fa"
                                                        data-icon="check-circle"
                                                        role="img"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        data-fa-i2svg=""
                                                        style={{ transformOrigin: "0.5em 0.625em" }}
                                                    >
                                                        <g transform="translate(256 256)">
                                                            <g transform="translate(0, 64)  scale(0.75, 0.75)  rotate(0 0 0)">
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                                                                    transform="translate(-256 -256)"
                                                                />
                                                            </g>
                                                        </g>
                                                    </svg>
                                                    {/* <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small> Font Awesome fontawesome.com */}
                                                </span>
                                            </h4>
                                            <h5 className="fs-0 fw-normal">
                                                {userDetails.Role}
                                            </h5>
                                            <p className="text-500">Phone number: {userDetails.Phone}</p>
                                            <button className="btn btn-falcon-danger btn-sm px-3" type="button">
                                                Ban
                                            </button>
                                            <button
                                                className="btn btn-falcon-danger btn-sm px-3 ms-2"
                                                type="button"
                                            >
                                                Block
                                            </button>
                                            <div className="border-dashed-bottom my-4 d-lg-none" />
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
