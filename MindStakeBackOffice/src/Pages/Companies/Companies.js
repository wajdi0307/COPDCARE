import React, { useEffect, useState } from 'react'
import axiosconfig from '../../axiosConfig'
import Company from './Company';
import ReactPaginate from 'react-paginate';


export default function Companies() {
    const [banks, setBanks] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/company/banks`);
                setBanks(response);
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(banks);

    }, []);


    function Items({ currentItems }) {
        return (
            <div className='row'>
                {currentItems && currentItems.map((bank, index) => (
                    <Company key={bank._id} bank={bank} />
                ))}
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
            setCurrentItems(banks.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(banks.length / itemsPerPage));
        }, [itemOffset, itemsPerPage]);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = event.selected * itemsPerPage % banks.length;
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
            <div className="card-header">
                <div className="row flex-between-center">
                    <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                        <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Companies</h5>
                    </div>
                    <div className="col-8 col-sm-auto ms-auto text-end ps-0">

                        <div id="orders-actions" className="">


                        </div>
                    </div>
                </div>
            </div>
            <div className='row' >


                <PaginatedItems itemsPerPage={4} />


            </div>

        </React.Fragment>
    )
}
