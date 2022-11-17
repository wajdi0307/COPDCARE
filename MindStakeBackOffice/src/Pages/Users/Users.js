import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import SingleUser from './SingleUser.js';
import axiosconfig from '../../axiosConfig'
import ReactPaginate from 'react-paginate';




export default function Users() {

    const [users, setUsers] = useState('')

    //const [newuser, setNewUser] = useState({  })

    const [imageP, setImageP] = useState()



    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/users`);
                setUsers(response);
                //console.log(response)

            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(users);

    }, []);


    function Items({ currentItems }) {
        return (
            <table className="table table-sm table-striped fs--1 mb-0 overflow-hidden">
                <thead className="bg-200 text-900">
                    <tr>
                        
                        <th
                            className="sort pe-1 align-middle white-space-nowrap"
                            data-sort="name"
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

                    {currentItems &&
                        currentItems.map((user, index) => (
                            <SingleUser key={user._id} user={user} />
                        ))
                    }

                </tbody>
            </table>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(() => {
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            setCurrentItems(users.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(users.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % users.length;
            console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
            setItemOffset(newOffset);
        };
        return (
            <>
                <Items currentItems={currentItems} />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}


                    />
                </div>
            </>
        );
    }







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
                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Users</h5>
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


                            <div id="table-customers-replace-element row" >




                                <div className='col-lg-8' >
                                    <select
                                        className="form-select form-select-sm ms-2"
                                        aria-label=".form-select-sm example"
                                        style={{ marginRight: '100px', marginBottom: '-29px', width: '150px' }}
                                    >
                                        <option selected="selected">All users</option>
                                        <option>Creator</option>
                                        <option>Investor</option>
                                        <option>Simple user</option>

                                    </select>
                                </div>

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

                        <PaginatedItems itemsPerPage={4} />



                    </div>
                </div>

            </div>



        </React.Fragment>
    )
}
