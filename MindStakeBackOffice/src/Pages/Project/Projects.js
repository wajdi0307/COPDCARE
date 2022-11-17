import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Project from './Project.js'
import axiosconfig from '../../axiosConfig'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';



export default function Projects() {

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
            <div className="card-body p-0 overflow-hidden">
                <div className="row g-0">
                    {currentItems &&
                        currentItems.map((project, index) => (
                            <Project key={project._id} project={project} />
                        ))
                    }


                </div>
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
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row flex-between-center">
                        <div className="col-sm-auto mb-2 mb-sm-0">
                            <h6 className="mb-0">Showing {projects.length} of {projects.length} Projects</h6>
                        </div>
                        <div className="col-sm-auto">
                            <div className="row gx-2 align-items-center">
                                <div className="col-auto">
                                    <form className="row gx-2">
                                        <div className="col-auto">
                                            <small>Sort by: </small>
                                        </div>
                                        <div className="col-auto">
                                            <select
                                                className="form-select form-select-sm"
                                                aria-label="Bulk actions"
                                            >
                                                <option selected="">Best Match</option>
                                                <option value="Refund">Newest</option>
                                                <option value="Delete">Price</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div class="col-auto pe-0">
                                    <Link class="text-600 px-1" to='/projectslist'>
                                        <span class="fas fa-list-ul">
                                        </span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="card">


                <PaginatedItems itemsPerPage={4} />


            </div>


        </React.Fragment>
    )
}
