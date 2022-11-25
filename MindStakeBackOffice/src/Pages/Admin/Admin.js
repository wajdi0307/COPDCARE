import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axiosconfig from '../../axiosConfig'



export default function Admin() {

    const [admins, setAdmins] = useState('')

    const [newuser, setNewUser] = useState({ Role: "ADMIN" })

    const [imageP, setImageP] = useState()



    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(`https://mindstakeback.herokuapp.com/users/admins`);
                setAdmins(response);
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(admins);

    }, []);


    const addAdmin = (e) => {
        e.preventDefault()
        const dataI = new FormData();
        dataI.append("file", imageP)
        dataI.append("FirstName", newuser.FirstName)
        dataI.append("LastName", newuser.LastName)
        dataI.append("UserName", newuser.UserName)
        dataI.append("Email", newuser.Email)
        dataI.append("Password", newuser.Password)
        dataI.append("Phone", newuser.Phone)
        dataI.append("Role", newuser.Role)



        axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, dataI)
            .then(res => {
                if (res.data == null) {
                    Swal.fire(
                        'This email already exist!',
                        '',
                        'warning'
                    )
                } else {

                    localStorage.setItem('userId', res.data.userId)
                    navigate('/admin')
                    window.location.reload()
                    console.log(localStorage.getItem('token'))
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChange = (e) => {
        e.preventDefault()
        setNewUser({ ...newuser, [e.target.name]: e.target.value })
    }

    const changeImage = (e) => {
        setImageP(e.target.files[0])

    }




    const Admin = (props) => {
        const [admin, setAdmin] = useState(props.admin);
        var date = new Date(parseInt(admin._id.toString().slice(0, 8), 16) * 1000);
        var CreateDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', day: 'numeric', month: 'numeric' }).format(date)
        return (
            <tr className="btn-reveal-trigger">
                <td className="align-middle py-2" style={{ width: 28 }}>
                    <div className="form-check fs-0 mb-0 d-flex align-items-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="customer-0"
                            data-bulk-select-row="data-bulk-select-row"
                        />
                    </div>
                </td>
                <td className="name align-middle white-space-nowrap py-2">
                    <a href="../../app/e-commerce/customer-details.html">
                        <div className="d-flex d-flex align-items-center">
                            <div className="avatar avatar-xl me-2">
                                <div className="avatar-name rounded-circle">
                                    {admin.ImageProfile !== "avatar.png" && <img src={`https://storage.googleapis.com/mindstake_bucket/${admin.ImageProfile}`} alt="admin" style={{borderRadius:'50%'}}/>}

                                    {admin.ImageProfile === "avatar.png" && <span>{admin.UserName.charAt(0).toUpperCase()}</span> }
                                </div>
                            </div>
                            <div className="flex-1">
                                <h5 className="mb-0 fs--1">{admin.UserName}</h5>
                            </div>
                        </div>
                    </a>
                </td>
                <td className="email align-middle py-2">
                    <a href={`mailto:${admin.Email}`} style={{color:'green'}}>{admin.Email}</a>
                </td>
                <td className="phone align-middle white-space-nowrap py-2" >
                    <a href={`tel:${admin.Phone}`} style={{color:'green'}}>{admin.Phone}</a>
                </td>

                <td className="joined align-middle py-2">{admin.Role}</td>
                <td className="joined align-middle py-2">{CreateDate}</td>

                <td className="align-middle white-space-nowrap py-2 text-end">
                    <div className="dropdown font-sans-serif position-static">
                        {/* <button
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
                             <span class="fas fa-ellipsis-h fs--1"></span> Font Awesome fontawesome.com 
                        </button> */}
                        {/* <div
                            className="dropdown-menu dropdown-menu-end border py-0"
                            aria-labelledby="customer-dropdown-0"
                        >
                            <div className="bg-white py-2">
                                <a className="dropdown-item" href="#!">
                                    Edit
                                </a>
                                <a className="dropdown-item text-danger" href="#!">
                                    Delete
                                </a>
                            </div>
                        </div> */}
                    </div>
                </td>
            </tr>
        );
    };


    return (
        <React.Fragment>
            <div
                className="card mb-3"
                id="customersTable"
                data-list='{"valueNames":["name","email","phone","address","joined"],"page":10,"pagination":true}'
            >
                <div className="card-header">
                    <div className="row flex-between-center">
                        <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Patients</h5>
                        </div>
                        <div className="col-8 col-sm-auto text-end ps-2">
                            <div className="d-none" id="table-customers-actions">
                                <div className="d-flex">
                                    <select
                                        className="form-select form-select-sm"
                                        aria-label="Bulk actions"
                                    >
                                        <option selected="">Bulk actions</option>
                                        <option value="Delete">Delete</option>

                                    </select>
                                    <button
                                        className="btn btn-falcon-default btn-sm ms-2"
                                        type="button"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div id="table-customers-replace-element">
                                <button className="btn btn-falcon-default btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#newAdmin">
                                    <svg
                                        className="svg-inline--fa fa-plus fa-w-14"
                                        data-fa-transform="shrink-3 down-2"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="plus"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        data-fa-i2svg=""
                                        style={{ transformOrigin: "0.4375em 0.625em" }}
                                    >
                                        <g transform="translate(224 256)">
                                            <g transform="translate(0, 64)  scale(0.8125, 0.8125)  rotate(0 0 0)">
                                                <path
                                                    fill="currentColor"
                                                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                                    transform="translate(-224 -256)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                    {/* <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                    <span className="d-none d-sm-inline-block ms-1">New</span>
                                </button>
                                <div
                                    className="modal fade"
                                    id="newAdmin"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-hidden="true"
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
                                                />
                                            </div>
                                            <div className="modal-body p-0">
                                                <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                                                    <h4 className="mb-1" id="modalExampleDemoLabel">
                                                        Add a new Admin{" "}
                                                    </h4>
                                                </div>
                                                <div className="p-4 pb-0">
                                                    <form onSubmit={addAdmin}>
                                                        <div className='row'>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="col-form-label" htmlFor="recipient-name">
                                                                    Firstname:
                                                                </label>
                                                                <input className="form-control" id="recipient-name" type="text"
                                                                    name='FirstName' value={newuser.FirstName} onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="col-form-label" htmlFor="recipient-name">
                                                                    Lastname:
                                                                </label>
                                                                <input className="form-control" id="recipient-name" type="text"
                                                                    name='LastName' value={newuser.LastName} onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="col-form-label" htmlFor="recipient-name">
                                                                    Username:
                                                                </label>
                                                                <input className="form-control" id="recipient-name" type="text"
                                                                    name='UserName' value={newuser.UserName} onChange={handleChange} />
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <label className="col-form-label" htmlFor="recipient-name">
                                                                    Role:
                                                                </label>
                                                                <input className="form-control" id="recipient-name" type="text" value="ADMIN"
                                                                    name='Role' onChange={handleChange} disabled readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="col-form-label" htmlFor="recipient-name">
                                                                Email:
                                                            </label>
                                                            <input className="form-control" id="recipient-name" type="email"
                                                                name='Email' value={newuser.Email} onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="col-form-label" htmlFor="recipient-name">
                                                                Password:
                                                            </label>
                                                            <input className="form-control" id="recipient-name" type="password"
                                                                name='Password' value={newuser.Password} onChange={handleChange} />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label className="col-form-label" htmlFor="recipient-name">
                                                                Phone number:
                                                            </label>
                                                            <input className="form-control" id="recipient-name" type="number"
                                                                name='Phone' value={newuser.Phone} onChange={handleChange} />
                                                        </div>
                                                        <div class="mb-3">
                                                            <label class="form-label" for="customFile">Profile Image</label>
                                                            <input class="form-control" id="customFile" type="file"
                                                                name='ImageProfile' onChange={changeImage} />
                                                        </div>

                                                        <div className="modal-footer">
                                                            <button
                                                                className="btn btn-secondary"
                                                                type="button"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Close
                                                            </button>
                                                            <button className="btn btn-primary" type="submit">
                                                                save
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <button className="btn btn-falcon-default btn-sm mx-2" type="button">
                                    <svg
                                        className="svg-inline--fa fa-filter fa-w-16"
                                        data-fa-transform="shrink-3 down-2"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="filter"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        data-fa-i2svg=""
                                        style={{ transformOrigin: "0.5em 0.625em" }}
                                    >
                                        <g transform="translate(256 256)">
                                            <g transform="translate(0, 64)  scale(0.8125, 0.8125)  rotate(0 0 0)">
                                                <path
                                                    fill="currentColor"
                                                    d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
                                                    transform="translate(-256 -256)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                    {/* <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                    <span className="d-none d-sm-inline-block ms-1">Filter</span>
                                </button>
                                <button className="btn btn-falcon-default btn-sm" type="button">
                                    <svg
                                        className="svg-inline--fa fa-external-link-alt fa-w-16"
                                        data-fa-transform="shrink-3 down-2"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="external-link-alt"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        data-fa-i2svg=""
                                        style={{ transformOrigin: "0.5em 0.625em" }}
                                    >
                                        <g transform="translate(256 256)">
                                            <g transform="translate(0, 64)  scale(0.8125, 0.8125)  rotate(0 0 0)">
                                                <path
                                                    fill="currentColor"
                                                    d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"
                                                    transform="translate(-256 -256)"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                    {/* <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                    <span className="d-none d-sm-inline-block ms-1">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive scrollbar">
                        <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                            <thead className="bg-200 text-900">
                                <tr>
                                    <th>
                                        <div className="form-check fs-0 mb-0 d-flex align-items-center">
                                            <input
                                                className="form-check-input"
                                                id="checkbox-bulk-customers-select"
                                                type="checkbox"
                                                data-bulk-select='{"body":"table-customers-body","actions":"table-customers-actions","replacedElement":"table-customers-replace-element"}'
                                            />
                                        </div>
                                    </th>
                                    <th
                                        className="sort pe-1 align-middle white-space-nowrap"
                                        data-sort="Name"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="sort pe-1 align-middle white-space-nowrap"
                                        data-sort="email"
                                    >
                                        Email
                                    </th>
                                    <th
                                        className="sort pe-1 align-middle white-space-nowrap"
                                        data-sort="phone"
                                    >
                                        Phone
                                    </th>

                                    <th
                                        className="sort pe-1 align-middle white-space-nowrap"
                                        data-sort="role"
                                    >
                                        Role
                                    </th>
                                    <th
                                        className="sort pe-1 align-middle white-space-nowrap"
                                        data-sort="joined"
                                    >
                                        Joined
                                    </th>
                                    <th className="align-middle no-sort" />
                                </tr>
                            </thead>
                            <tbody className="list" id="table-customers-body">

                                {admins &&
                                    admins.map((admin, index) => (
                                        <Admin key={index} admin={admin} />
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card-footer d-flex align-items-center justify-content-center">
                    <button
                        className="btn btn-sm btn-falcon-default me-1 disabled"
                        type="button"
                        title="Previous"
                        data-list-pagination="prev"
                        disabled=""
                    >
                        <svg
                            className="svg-inline--fa fa-chevron-left fa-w-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-left"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            data-fa-i2svg=""
                        >
                            <path
                                fill="currentColor"
                                d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                            />
                        </svg>
                        {/* <span class="fas fa-chevron-left"></span> Font Awesome fontawesome.com */}
                    </button>
                    <ul className="pagination mb-0">
                        <li className="active">
                            <button className="page" type="button" data-i={1} data-page={10}>
                                1
                            </button>
                        </li>
                        <li>
                            <button className="page" type="button" data-i={2} data-page={10}>
                                2
                            </button>
                        </li>
                        <li>
                            <button className="page" type="button" data-i={3} data-page={10}>
                                3
                            </button>
                        </li>
                    </ul>
                    <button
                        className="btn btn-sm btn-falcon-default ms-1"
                        type="button"
                        title="Next"
                        data-list-pagination="next"
                    >
                        <svg
                            className="svg-inline--fa fa-chevron-right fa-w-10"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="chevron-right"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 320 512"
                            data-fa-i2svg=""
                        >
                            <path
                                fill="currentColor"
                                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                            />
                        </svg>
                        {/* <span class="fas fa-chevron-right"></span> Font Awesome fontawesome.com */}
                    </button>
                </div>
            </div>



        </React.Fragment>
    )
}
