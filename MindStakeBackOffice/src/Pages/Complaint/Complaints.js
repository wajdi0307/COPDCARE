import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import Complaint from './Complaint';
import ReactToPrint from 'react-to-print';
import axiosconfig from '../../axiosConfig'
import ReactPaginate from 'react-paginate';

import './Complaint.css'


export default function Complaints() {
    const [complaints, setComplaints] = useState('')


    const handlePrint = () => {
        var content = document.getElementById("tab1");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.outerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/complaints/`);
                setComplaints(response);
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(complaints);

    }, []);


    function Items({ currentItems }) {
        return (
            <div className="table-responsive " >
                <table className="table table-sm table-striped fs--1 mb-0 "  >
                    <thead className="bg-200 text-900">
                        <tr>
                            
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                            >
                                Project
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap pe-7"

                            >
                                Date
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-wrap"
                                style={{ minWidth: "9rem" }}
                            >
                                Title
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-wrap"
                                style={{ minWidth: "10rem" }}
                            >
                                Description
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap text-center"
                            >
                                Status
                            </th>

                            <th className="no-sort" />
                        </tr>
                    </thead>
                    <tbody className="list" id="table-orders-body">
                        {currentItems &&
                            currentItems.map((complaint, index) => (
                                <Complaint key={complaint._id} complaint={complaint} />
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
            setCurrentItems(complaints.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(complaints.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % complaints.length;
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
                <iframe id="ifmcontentstoprint" style={{ height: '0px', width: '0px', position: 'absolute' }}></iframe>

                <div className="card-header">
                    <div className="row flex-between-center">
                        <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                            <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Complaints</h5>
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
                               

                                <button className="btn btn-falcon-default btn-sm" type="button" onClick={handlePrint}>
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


                    <PaginatedItems itemsPerPage={5} />




                </div>
                
            </div>
        </React.Fragment>
    )
}
