import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SingleProjectList from './SingleProjectList'
import axiosconfig from '../../axiosConfig'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


export default function ProjectList() {

    const [projects, setProjects] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/projects/getallprojectsadmin`);
                setProjects(response);
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(projects);

    }, []);

    function Items({ currentItems }) {
        return (
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
                                        data-bulk-select='{"body":"table-orders-body","actions":"orders-bulk-actions","replacedElement":"orders-actions"}'
                                    />
                                </div>
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="order"
                            >
                                Project
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap pe-7"
                                data-sort="date"

                            >
                                Date
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="address"
                                style={{ minWidth: "12.5rem" }}
                            >
                                Title
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap text-center"
                                data-sort="status"
                            >
                                Status
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap text-end"
                                data-sort="amount"
                            >
                                Goal
                            </th>
                            <th className="no-sort" />
                        </tr>
                    </thead>
                    <tbody className="list" id="table-orders-body">
                        {currentItems &&
                            currentItems.map((project, index) => (
                                <SingleProjectList key={project._id} project={project} />
                            ))
                        }

                    </tbody>
                </table>
            </div>
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
            setCurrentItems(projects.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(projects.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % projects.length;
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
                id="ordersTable"
                data-list='{"valueNames":["order","date","address","status","amount"],"page":10,"pagination":true}'
            >
                <div className="card-header">
                    <div className="row gx-2 align-items-center">
                        <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Projects</h5>
                        </div>
                        <div className="col-8 col-sm-auto ms-auto text-end ps-0">
                            <div className="d-none" id="orders-bulk-actions">
                                <div className="d-flex">
                                    <select
                                        className="form-select form-select-sm"
                                        aria-label="Bulk actions"
                                    >
                                        <option selected="">Bulk actions</option>
                                        <option value="Refund">Refund</option>
                                        <option value="Delete">Delete</option>
                                        <option value="Archive">Archive</option>
                                    </select>
                                    <button
                                        className="btn btn-falcon-default btn-sm ms-2"
                                        type="button"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            <div id="orders-actions" className="">
                                {/* <button className="btn btn-falcon-default btn-sm" type="button">
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
                                    </svg> */}
                                {/* <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                {/* <span className="d-none d-sm-inline-block ms-1">New</span> */}
                                {/* </button> */}
                                <select className="btn btn-falcon-default btn-sm mx-2" type="button">
                                    <option>Categories</option>
                                    <option>Art</option>
                                    <option>Illustrations</option>
                                    <option>Technology</option>
                                    <option>Cinema</option>
                                    <option>Creation</option>
                                    <option>Gaming</option>
                                    <option>Music</option>
                                    <option>Other</option>


                                </select>
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
                        <div class="col-auto pe-0">
                            <Link class="text-600 px-1" to="/projects">
                                <svg class="svg-inline--fa fa-th fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="th" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor" d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z">
                                    </path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">

                    <PaginatedItems itemsPerPage={5} />



                </div>

            </div>

        </React.Fragment>
    )
}
