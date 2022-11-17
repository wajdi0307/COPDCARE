import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosconfig from '../../axiosConfig'

import Select from 'react-select';
import makeAnimated from 'react-select/animated';


import './pack.css'


export default function Pack(props) {

    const animatedComponents = makeAnimated();

    const [pack, setPack] = useState(props.pack)

    const [feature, setFeature] = useState([''])

    const [editpack, setEditPack] = useState({})


    const deletePack=()=>{
        props.deletePack(pack._id)
    }

    const editPack = (e) =>{
        e.preventDefault()
        const dataI = {
            Title: editpack.Title,
            Duration: editpack.Duration,
            Level: editpack.Level,
            Price: editpack.Price,
            Description: editpack.Description,
            Features: props.feature
        }

        axiosconfig.put(`/packs/update/${pack._id}`, dataI)
            .then(res => {
                console.log(dataI)
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChangeEditPack = (e) => {
        e.preventDefault()
        setEditPack({ ...editpack, [e.target.name]: e.target.value })
    }

    const handleChangeFeatures = (e) => {
        props.feature.push(Array.isArray(e) ? e.map(x => x.value) : []);
        //console.log(e.target.value)
    }


    return (
        <React.Fragment>
           
                <div className="col-lg-4 border-top border-bottom bg-pack" style={props.k === 1 ? { backgroundColor: "rgba(115, 255, 236, 0.18)" } : {}}>
                    <div className="h-100">
                        <div className="text-center p-4">
                            <h3 className="fw-normal my-0">{pack.Title}</h3>
                            <p className="mt-3">
                                {pack.Description}
                            </p>

                            <h2 className="fw-medium my-4">
                                {" "}
                                <sup className="fw-normal fs-2 me-1">$</sup>{pack.Price}
                                <small className="fs--1 text-700">/ {pack.Duration}</small>
                            </h2>
                            <div >
                                {/* <a className="btn btn-primary" style={{ marginRight:'10px' }}
                                data-bs-toggle="modal" data-bs-target="#editPack">
                                    <EditIcon/>
                                </a> */}
                                <a className="btn btn-danger" onClick={deletePack}>
                                    <DeleteIcon/>
                                </a>
                            </div>

                        </div>
                        <hr className="border-bottom-0 m-0" />
                        <div className="text-start px-sm-4 py-4">
                            <h5 className="fw-medium fs-0">Features:</h5>
                            <ul className="list-unstyled mt-3">



                                {pack.Features && pack.Features.map((feat11, index) => {
                                    // console.log('aaa');
                                    return (<li className="py-1" >
                                        <svg class="svg-inline--fa fa-check fa-w-16 me-2 text-success" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>

                                        {feat11}

                                    </li>)

                                })

                                }


                            </ul>
                            
                        </div>
                    </div>
                    <div
                            className="modal fade"
                            id="editPack"
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
                                                Edit a Pack{" "}
                                            </h4>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <form onSubmit={editPack}>
                                                <div className='row'>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Title:
                                                        </label>
                                                        <input className="form-control" id="recipient-name" type="text"
                                                            name='Title' value={editpack.Title} onChange={handleChangeEditPack} />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Duration:
                                                        </label>
                                                        <select className='form-select' name='Duration' value={editpack.Duration} onChange={handleChangeEditPack}>
                                                            <option>Choose duration...</option>
                                                            <option>Month</option>
                                                            <option>Year</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Level:
                                                        </label>
                                                        <input className="form-control" id="recipient-name" type="number"
                                                            name='Level' value={editpack.Level} onChange={handleChangeEditPack} />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Price:
                                                        </label>
                                                        <input className="form-control" id="recipient-name" type="number"
                                                            name='Price' value={editpack.Price} onChange={handleChangeEditPack} />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label" htmlFor="recipient-name">
                                                        Description:
                                                    </label>
                                                    <textarea className="form-control" id="recipient-name" type="text"
                                                        name='Description' value={editpack.Description} onChange={handleChangeEditPack} ></textarea>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label" htmlFor="recipient-name">
                                                        Features:
                                                    </label>
                                                    <br />
                                                    <div className='col' >

                                                        <div className="mb-3">
                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                defaultValue={props.opts[0]}
                                                                isMulti
                                                                options={props.opts}
                                                                name='Features'
                                                                valu={props.opts.filter(obj => props.feature.includes(obj.value))}
                                                                onChange={handleChangeFeatures}
                                                            />
                                                            {console.log(props.feature)}

                                                        </div>
                                                    </div>
                                                 

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
                </div>

        </React.Fragment>
    )

}