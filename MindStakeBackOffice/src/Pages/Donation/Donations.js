import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosconfig from '../../axiosConfig'
import Donation from './Donation';
import ReactPaginate from 'react-paginate';


export default function Donations() {

    const [donations, setDonations] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/payment/donations`);
                setDonations(response);
                //console.log(response)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(donations);

    }, []);

    function Items({ currentItems }) {
        return (
            <div className="table-responsive scrollbar">
                <table className="table table-dashboard mb-0 fs--1">
                    <thead className="bg-200 text-900">
                        <tr>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="Name"
                            >
                                Donation
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="role"
                                style={{ marginLeft: '30px' }}
                            >
                                Receiver
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="email"
                            >
                                Amount
                            </th>
                            <th
                                className="sort pe-1 align-middle white-space-nowrap"
                                data-sort="phone"
                            >
                                Creation date
                            </th>

                            <th className=" no-sort" />

                        </tr>
                    </thead>
                    <tbody>
                        {currentItems && currentItems.map((donation, index) => (
                            <Donation key={donation._id} donation={donation} />

                        ))}
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
            setCurrentItems(donations.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(donations.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % donations.length;
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
            <div className="row">
                <div className="col">
                    <div className="card overflow-hidden">
                        <div className="card-header d-flex flex-between-center bg-light py-2">
                            <h6 className="mb-0">Donations Summary</h6>
                            <div className="dropdown font-sans-serif btn-reveal-trigger">
                                <button
                                    className="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal"
                                    type="button"
                                    id="dropdown-transaction-summary"
                                    data-bs-toggle="dropdown"
                                    data-boundary="viewport"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <span className="fas fa-ellipsis-h fs--2" />
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-end border py-2"
                                    aria-labelledby="dropdown-transaction-summary"
                                >
                                    <a className="dropdown-item" href="#!">
                                        View
                                    </a>
                                    <a className="dropdown-item" href="#!">
                                        Export
                                    </a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item text-danger" href="#!">
                                        Remove
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body py-0">

                            <PaginatedItems itemsPerPage={5} />


                        </div>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
