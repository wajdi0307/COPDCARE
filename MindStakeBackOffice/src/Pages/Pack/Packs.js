import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pack from './Pack.js';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import PlusIcon from '@mui/icons-material/Add';
import PlusCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import Select from 'react-select';
import axiosconfig from '../../axiosConfig'
import makeAnimated from 'react-select/animated';

import './pack.css'
import { useNavigate } from 'react-router-dom';





export default function Packs() {

    const navigate = useNavigate()

    const animatedComponents = makeAnimated();

    const [packs, setPacks] = useState('')

    const [addInput, setAddInput] = useState(false)

    const [dPack, setDPack] = useState(false)

    const [color, setColor] = useState('lightgray')

    const [newfeature, setNewFeature] = useState({})

    const [newpack, setNewPack] = useState({})

    const [editpack, setEditPack] = useState({})


    const [features, setFeatures] = useState([])



    const [showFeature, setShowFeature] = useState(false)



    var options = []



    const clickAdd = () => {
        setAddInput(!addInput)
    }

    const addPack = (e) => {
        e.preventDefault()
        const dataI = {
            Title: newpack.Title,
            Duration: newpack.Duration,
            Level: newpack.Level,
            Price: newpack.Price,
            Description: newpack.Description,
            Features: features
        }

        axiosconfig.post(`/packs/addPack`, dataI)
            .then(res => {
                console.log(dataI)
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
    }

   

    const handleChangePack = (e) => {
        e.preventDefault()
        setNewPack({ ...newpack, [e.target.name]: e.target.value })
    }

   

    const handleChangeFeatures = (e) => {
        setFeatures(Array.isArray(e) ? e.map(x => x.value) : []);
        //console.log(e.target.value)
    }


    const addFeature = (e) => {
        //e.preventDefault()
        const data = {
            Description: newfeature.Description
        }
        axiosconfig.post(`/features/addFeature`, data)
            .then(res => {
                setShowFeature(!showFeature)
                setNewFeature({})
                setAddInput(false)
            })
            .catch(err => {
                console.error(err);
            })
        window.location.reload()

    }

    const handleChange = (e) => {
        e.preventDefault()
        setNewFeature({ ...newfeature, [e.target.name]: e.target.value })
    }

    const deleteP = (id) => {
        axiosconfig.delete(`/packs/delete/${id}`)
            .then(
                //setDPack(!dPack)
                window.location.reload()

            )
    }

    const [feature, setFeature] = useState([''])
    var feat = []
    useEffect(() => {
        axiosconfig.get(`/features/all`).then(res => {
            // console.log(res)
            res.data.map((r) => {
                //  console.log(r.Description)
                feat.push(r.Description)
            })
        })
    }, [showFeature])



    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/packs/`);
                setPacks(response);
                //console.log(response)
            } catch (error) {
                console.error(error)
            }
            setFeature(feat)
            //console.log(feature) 


        };
        fetchData().then(packs, feature, newfeature);

    }, [dPack]);



    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };


    return (
        <React.Fragment>
            <div className="card mb-3">
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col-12 mb-3">
                            <div className="row justify-content-center justify-content-sm-between">
                                <div className="col-sm-auto text-center">
                                    <h5 className="d-inline-block">Packs pricing</h5>
                                    <span className="badge badge-soft-success rounded-pill ms-2">
                                        Save 25%
                                    </span>
                                </div>
                                <div className="col-sm-auto d-flex justify-content-center mt-1 mt-sm-0">
                                    <button style={{ marginRight: '30px', marginBottom: '10px' }} className="btn btn-falcon-default btn-sm"
                                        type="button" data-bs-toggle="modal" data-bs-target="#newFeature">
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
                                        </svg>
                                        {/* <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                        <span className="d-none d-sm-inline-block ms-1">New Feature</span>
                                    </button>
                                    <button style={{ marginRight: '30px', marginBottom: '10px' }} className="btn btn-falcon-default btn-sm"
                                        type="button" data-bs-toggle="modal" data-bs-target="#newPack">
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
                                        </svg>
                                        {/* <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span> Font Awesome fontawesome.com */}
                                        <span className="d-none d-sm-inline-block ms-1">New</span>
                                    </button>

                                    <label className="form-check-label me-2" htmlFor="customSwitch1">
                                        Monthly
                                    </label>
                                    <div className="form-check form-switch mb-0">
                                        <input
                                            className="form-check-input"
                                            id="customSwitch1"
                                            type="checkbox"

                                        />
                                        <label
                                            className="form-check-label align-top"
                                            htmlFor="customSwitch1"
                                        >
                                            Yearly
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="modal fade"
                            id="newPack"
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
                                                Add a new Pack{" "}
                                            </h4>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <form onSubmit={addPack}>
                                                <div className='row'>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Title:
                                                        </label>
                                                        <input className="form-control" id="recipient-name" type="text"
                                                            name='Title' value={newpack.Title} onChange={handleChangePack} />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Duration:
                                                        </label>
                                                        <select className='form-select' name='Duration' value={newpack.Duration} onChange={handleChangePack}>
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
                                                            name='Level' value={newpack.Level} onChange={handleChangePack} />
                                                    </div>
                                                    <div className="col-lg-6 mb-3">
                                                        <label className="col-form-label" htmlFor="recipient-name">
                                                            Price:
                                                        </label>
                                                        <input className="form-control" id="recipient-name" type="number"
                                                            name='Price' value={newpack.Price} onChange={handleChangePack} />
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="col-form-label" htmlFor="recipient-name">
                                                        Description:
                                                    </label>
                                                    <textarea className="form-control" id="recipient-name" type="text"
                                                        name='Description' value={newpack.Description} onChange={handleChangePack} ></textarea>
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
                                                                defaultValue={options[0]}
                                                                isMulti
                                                                options={options}
                                                                name='Features'
                                                                valu={options.filter(obj => features.includes(obj.value))}
                                                                onChange={handleChangeFeatures}
                                                            />
                                                            {console.log(features)}

                                                        </div>
                                                    </div>
                                                    {/* <button className="btn btn-light me-1 mb-1" onClick={clickAdd} type="button">{<PlusIcon />}Add new feature</button>
                                                    {addInput &&
                                                        <div style={{ position: 'relative' }}>
                                                            <input className='form-control' name='Description' value={newfeature.Description} onChange={handleChange} />
                                                            <div style={{ position: 'absolute', top: '10%', marginTop: '-5px', left: '90%' }} >
                                                                <IconButton style={{ top: '10%' }} onClick={() => addFeature()}>
                                                                    <PlusCircleIcon />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    } */}

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

                        

                        <div
                            className="modal fade"
                            id="newFeature"
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
                                            id='modalFeature'
                                            className="btn-close btn btn-sm btn-circle d-flex flex-center transition-base"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body p-0">
                                        <div className="rounded-top-lg py-3 ps-4 pe-6 bg-light">
                                            <h4 className="mb-1" id="modalExampleDemoLabel">
                                                Add a new Feature{" "}
                                            </h4>
                                        </div>
                                        <div className="p-4 pb-0">
                                            <form >


                                                <div className="mb-3">
                                                    <label className="col-form-label" htmlFor="recipient-name">
                                                        Features:
                                                    </label>
                                                    <br />
                                                    <div className='col' >
                                                        {feature && feature.map((f, id) => {
                                                            options.push({ value: f, label: f })

                                                            const clickChip = (id) => {
                                                                axiosconfig.delete(`/features/delete/${f}`)
                                                                    .then(res => {
                                                                        //console.log('deleted')

                                                                    })
                                                                    .catch(err => {
                                                                        console.error(err);
                                                                    })
                                                                window.location.reload()
                                                            }

                                                            return (
                                                                <Chip
                                                                    label={f}
                                                                    key={id}
                                                                    style={{ margin: '5px 5px' }}
                                                                    onDelete={clickChip}
                                                                    deleteIcon={<DeleteIcon />}
                                                                />
                                                            )
                                                        })}
                                                        {/* <div className="mb-3">
                                                            <Select
                                                                closeMenuOnSelect={false}
                                                                components={animatedComponents}
                                                                isMulti
                                                                options={options}
                                                            />
                                                        </div> */}
                                                    </div>
                                                    <br />
                                                    <button className="btn btn-light me-1 mb-1" onClick={clickAdd} type="button">{<PlusIcon />}Add new feature</button>
                                                    {addInput &&
                                                        <div style={{ position: 'relative' }}>
                                                            <input className='form-control' name='Description' value={newfeature.Description} onChange={handleChange} />
                                                            <div style={{ position: 'absolute', top: '10%', marginTop: '-5px', left: '90%' }} >
                                                                <IconButton style={{ top: '10%' }} onClick={() => addFeature()}>
                                                                    <PlusCircleIcon />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>



                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {packs &&
                            packs.map((pack, index) => (
                                <Pack key={index} k={index} pack={pack} feature={features} opts={options} deletePack={(id) => { deleteP(id) }} />
                            ))
                        }


                        {/* <div
                            className="col-lg-4 border-top border-bottom dark__bg-1000 px-4 px-lg-0"
                            style={{ backgroundColor: "rgba(115, 255, 236, 0.18)" }}
                        > */}

                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
