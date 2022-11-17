import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axiosconfig from '../../axiosConfig'


export default function SingleProjectList(props) {

    const [project, setProject] = useState(props.project)

    const [user, setUser] = useState('')

    const navigate = useNavigate()




    const start = new Date(project.CreationDate)
    const createDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(start)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/${project.User}`);
                setUser(response[0].UserName);
                console.log(response[0].UserName)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(user);

    }, []);



    const approve = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Approved!',
                    'The project has been approved.',
                    'success'
                )
                const data = { Approved: true }
                axiosconfig.put(`/projects/approveproject/${project._id}`, data)
                    .then(navigate('/projects'))

            }
        })
    }

    const reject = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Rejected!',
                    'The project has been deleted.',
                    'success'
                )
                axiosconfig.delete(`/projects/deleteproject/${project._id}`)
                    .then(navigate('/projects'))

            }
        })


    }

    const proccessing = () => {
        return "proccessing"
    }


    return (
        <React.Fragment>
            <tr className="btn-reveal-trigger">
                <td className="align-middle" style={{ width: 28 }}>
                    <div className="form-check fs-0 mb-0 d-flex align-items-center">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox-0"
                            data-bulk-select-row="data-bulk-select-row"

                        />
                    </div>
                </td>
                <td className="order py-2 align-middle white-space-nowrap">
                    <Link to='/projects'>
                        {" "}
                        <strong>#{project._id}</strong>
                    </Link>{" "}

                    <br />
                    by <strong>{user}</strong>
                </td>
                <td className="date py-2 align-middle" style={{ width: '5px' }}>{createDate}</td>
                <td className="address py-2 align-middle white-space-wrap" style={{ maxWidth: '180px' }}>
                    {project.Title}
                    <p className="mb-0 text-500">{project.Category}</p>
                </td>
                <td className="status py-2 align-middle text-center fs-0 white-space-nowrap">
                    <span className={project.Approved ? "badge badge rounded-pill d-block badge-soft-success" : "badge badge rounded-pill d-block badge-soft-warning"}>
                        {project.Approved ? "Approved" : "Pending"}
                        <svg
                            className={project.Approved ? "svg-inline--fa fa-check fa-w-16 ms-1" : "svg-inline--fa fa-stream fa-w-16 ms-1"}
                            data-fa-transform="shrink-2"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon={project.Approved ? "check" : "stream"}
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            data-fa-i2svg=""
                            style={{ transformOrigin: "0.5em 0.5em" }}
                        >
                            <g transform="translate(256 256)">
                                <g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)">
                                    <path
                                        fill="currentColor"
                                        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                                        transform="translate(-256 -256)"
                                    />
                                </g>
                            </g>
                        </svg>
                        {/* <span class="ms-1 fas fa-check" data-fa-transform="shrink-2"></span> Font Awesome fontawesome.com */}
                    </span>
                </td>
                <td className="amount py-2 align-middle text-end fs-0 fw-medium">
                    ${project.Goal}
                </td>
                <td className="py-2 align-middle white-space-nowrap text-end">
                    <div className="dropdown font-sans-serif position-static">
                        <button
                            className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal"
                            type="button"
                            id="order-dropdown-0"
                            data-bs-toggle="dropdown"
                            data-boundary="viewport"
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
                        {project.Approved ?
                            <div
                                className="dropdown-menu dropdown-menu-end border py-0"
                                aria-labelledby="order-dropdown-0"
                                style={{}}
                            >


                                
                                <a className="dropdown-item text-danger" onClick={reject}>
                                    Delete
                                </a>
                            </div>

                            :
                            <div
                                className="dropdown-menu dropdown-menu-end border py-0"
                                aria-labelledby="order-dropdown-0"
                                style={{}}
                            >
                                <div className="bg-white py-2">
                                    <a className="dropdown-item text-success" onClick={approve}>
                                        Approve
                                    </a>



                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item text-danger" onClick={reject}>
                                        Reject
                                    </a>
                                </div>
                            </div>}
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )
}
