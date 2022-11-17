import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axiosconfig from '../../axiosConfig'


export default function Project(props) {
    //console.log(props)

    const [project, setProject] = useState(props.project)

    const start = new Date(project.CreationDate)
    const createDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric',day: 'numeric'}).format(start)

    const end = new Date(project.EndDate)
    const endD = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric',day: 'numeric'}).format(end)


    const approve = (e)=>{
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
              const data = {Approved: true}
              axiosconfig.put(`/projects/approveproject/${project._id}`,data)
              .then(window.location.reload())
            }
          })
    }

    const reject = (e)=>{
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
              .then(window.location.reload())
              
            }
          })
    }
    

    return (
        <React.Fragment>
            <div className="col-12 p-card">
                <div className="row">
                    <div className="col-sm-5 col-md-4">
                        <div className="position-relative h-sm-100">
                            <a
                                className="d-block h-100"
                                href="../../../app/e-commerce/product/product-details.html"
                            >
                                <img
                                    className="img-fluid fit-cover w-sm-100 h-sm-100 rounded-1 absolute-sm-centered"
                                    src={`https://storage.googleapis.com/mindstake_bucket/${project.Picture}`}
                                    alt=""
                                    style={{maxHeight:'300px'}}
                                />
                            </a>
                            {/* <div className="badge rounded-pill bg-success position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2">
                                New
                            </div> */}
                        </div>
                    </div>
                    <div className="col-sm-7 col-md-8">
                        <div className="row">
                            <div className="col-lg-8">
                                <h5 className="mt-3 mt-sm-0">
                                    <a
                                        className="text-dark fs-0 fs-lg-1"
                                        href="../../../app/e-commerce/product/product-details.html"
                                    >
                                        {project.Title}

                                    </a>
                                </h5>
                                <p className="fs--1 mb-2 mb-md-3">
                                    <a className="text-500" href="#!">
                                        {project.Category}
                                    </a>
                                </p>
                                <ul className="list-unstyled d-none d-lg-block">
                                    <li>
                                        <svg
                                            className="svg-inline--fa fa-circle fa-w-16"
                                            data-fa-transform="shrink-12"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="circle"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            data-fa-i2svg=""
                                            style={{ transformOrigin: "0.5em 0.5em" }}
                                        >
                                            <g transform="translate(256 256)">
                                                <g transform="translate(0, 0)  scale(0.25, 0.25)  rotate(0 0 0)">
                                                    <path
                                                        fill="currentColor"
                                                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                                        transform="translate(-256 -256)"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                        {/* <span class="fas fa-circle" data-fa-transform="shrink-12"></span> Font Awesome fontawesome.com */}
                                        <span>
                                            <u>Description:</u>
                                            <p> {project.Description} </p>
                                        </span>
                                    </li>

                                </ul>
                            </div>
                            <div className="col-lg-4 d-flex justify-content-between flex-column">
                                <div>
                                    <h4 className="fs-1 fs-md-2 text-warning mb-0">$ {project.Goal}
                                    </h4>

                                    <div className="mb-2 mt-3">
                                        <svg
                                            className="svg-inline--fa fa-star fa-w-18 text-warning"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="star"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            />
                                        </svg>
                                        {/* <span class="fa fa-star text-warning"></span> Font Awesome fontawesome.com */}
                                        <svg
                                            className="svg-inline--fa fa-star fa-w-18 text-warning"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="star"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            />
                                        </svg>
                                        {/* <span class="fa fa-star text-warning"></span> Font Awesome fontawesome.com */}
                                        <svg
                                            className="svg-inline--fa fa-star fa-w-18 text-warning"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="star"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            />
                                        </svg>
                                        {/* <span class="fa fa-star text-warning"></span> Font Awesome fontawesome.com */}
                                        <svg
                                            className="svg-inline--fa fa-star fa-w-18 text-warning"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="star"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            />
                                        </svg>
                                        {/* <span class="fa fa-star text-warning"></span> Font Awesome fontawesome.com */}
                                        <svg
                                            className="svg-inline--fa fa-star fa-w-18 text-300"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fa"
                                            data-icon="star"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                            />
                                        </svg>
                                        {/* <span class="fa fa-star text-300"></span> Font Awesome fontawesome.com */}
                                        <span className="ms-1">(8)</span>
                                    </div>
                                    <div className="d-none d-lg-block">
                                        <p className="fs--1 mb-1">
                                            Creation date: <strong>{createDate}</strong>
                                        </p>
                                        <p className="fs--1 mb-1">
                                            End date: <strong>{endD}</strong>
                                        </p>
                                        <p className="fs--1 mb-1">
                                            Status: <strong  className={project.Approved? "text-success":"text-warning"}>{project.Approved? "Approved":"Pending" }</strong>
                                        </p>
                                    </div>
                                </div>
                                {!project.Approved && <div className="mt-2">
                                    <a
                                        className="btn btn-sm btn-success border-300 d-lg-block me-2 me-lg-0"
                                        onClick={approve}
                                    >
                                        <svg
                                            className="svg-inline--fa fa-check-circle fa-w-16"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="far"
                                            data-icon="heart"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                            data-fa-i2svg=""
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                                            />
                                        </svg>
                                        {/* <span class="far fa-heart"></span> Font Awesome fontawesome.com */}
                                        <span className="ms-2 d-none d-md-inline-block">
                                            Approve
                                        </span>
                                    </a>
                                    <a
                                        className="btn btn-sm btn-danger  d-lg-block mt-lg-2"
                                        onClick={reject}
                                    >

                                        <span class="fas fa-ban"> </span>
                                        <span className="ms-2 d-none d-md-inline-block">
                                            Reject
                                        </span>
                                    </a>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dropdown-divider"></div>
        </React.Fragment>
    )
}
