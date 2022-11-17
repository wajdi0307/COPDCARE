import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosconfig from '../../axiosConfig'


import './Complaint.css'

export default function Complaint(props) {
    const [complaint, setComplaint] = useState(props.complaint)

    const [user, setUser] = useState('')

    const navigate = useNavigate()


    var date = new Date(parseInt(complaint._id.toString().slice(0, 8), 16) * 1000);
    var CreateDate = new Intl.DateTimeFormat('en-GB', { year: 'numeric', day: 'numeric', month: 'numeric' }).format(date)




   // const start = new Date(project.CreationDate)
   // const createDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric',day: 'numeric'}).format(start)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/${complaint.User}`);
                //console.log(complaint.User)
                setUser(response[0].UserName);
                //console.log(response[0])
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(user);

    }, []);



    const Treated = (e)=>{
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
              const data = {Treated: true}
              axiosconfig.put(`/complaints/treatcomplaint/${complaint._id}`,data)
              .then(navigate('/complaints'))

            }
          })
    }

    const pending = (e)=>{
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
                'Pending!',
                'The complaint still waiting for admin to treat it.',
                'success'
              )
              
              const data = {Treated: false}
              axiosconfig.put(`/complaints/treatcomplaint/${complaint._id}`,data)

              .then(navigate('/complaints'))
              
            }
          })
          

    }


    
    return (
        <React.Fragment>
            <tr className="btn-reveal-trigger">
               
                <td className="order py-2 align-middle white-space-nowrap">
                    <Link to='/projects' style={{color:'green'}}>
                        {" "}
                        <strong>#{complaint._id}</strong>
                    </Link>{" "}
                   
                    <br />
                    by <strong>{user}</strong>
                </td>
                <td className="date py-2 align-middle" style={{width:'5px'}}>{CreateDate}</td>
                <td className="address py-2 align-middle white-space-wrap tre" style={{maxWidth:'180px'}}>
                    {complaint.Title}
                </td>
                <td className="address py-2 align-middle white-space-wrap" style={{maxWidth:'180px'}}>
                    {complaint.Description}
                </td>
                <td className="status py-2 align-middle text-center fs-0 white-space-nowrap">
                    <span className={complaint.Treated ? "badge badge rounded-pill d-block badge-soft-success" : "badge badge rounded-pill d-block badge-soft-warning"}>
                        {complaint.Treated ? "Treated" : "Pending"}
                       
                        <span className={complaint.Treated ? "ms-1 fas fa-check" : "ms-1 fas fa-stream"} data-fa-transform="shrink-2"></span>
                    </span>
                </td>
               
                <td className="py-2 align-middle white-space-nowrap text-end ">
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
                        <div
                            className="dropdown-menu dropdown-menu-end border py-0 "
                            id='tre'
                            aria-labelledby="order-dropdown-0"
                            style={{}}
                        >
                            <div className="bg-white py-2">
                                <a className="dropdown-item" onClick={Treated}>
                                    Treat
                                </a>
                                <a className="dropdown-item" onClick={pending}>
                                    Processing
                                </a>
                               
{/*                                 
                                <div className="dropdown-divider" />
                                <a className="dropdown-item text-danger" onClick={reject}>
                                    Reject
                                </a> */}
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </React.Fragment>
    )
}
