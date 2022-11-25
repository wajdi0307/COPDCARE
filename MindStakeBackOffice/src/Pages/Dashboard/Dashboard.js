import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Cards from '../../components/Cards/Cards'
import PieChart from "react-apexcharts";
import axiosconfig from '../../axiosConfig'

export default function Dashboard() {

    

    const [category, setCategory] = useState([])
    const [count, setCount] = useState([])

    const [status, setStatus] = useState([])
    const [countProp, setCountProp] = useState([])



   
    console.log(category)
    console.log(count)
    const piechart =  {
        series: count,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: category,
 
        },
    }
        
    

    const pichart2 = {
        series: countProp,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: status,
            // responsive: [{
            //     breakpoint: 480,
            //     options: {
            //         chart: {
            //             width: 200
            //         },
            //         legend: {
            //             position: 'bottom'
            //         }
            //     }
            // }]
        },


    }



    const [complaints, setComplaints] = useState()
 

    const [projects, setProjects] = useState()


    const [users, setUsers] = useState()
   
    return (
        <React.Fragment>
            <>              
                <br />
                <div className="row g-3 mb-3">
                    <div className="col-xxl-9">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="card h-100">
                                    <div className="card-header">
                                        Projects By Categories
                                    </div>
                                    <PieChart options={piechart.options} series={piechart.series} type="pie" width={380} />

                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card h-100">
                                    <div className="card-header">
                                        Investments Proposals by Status
                                    </div>
                                    <PieChart options={pichart2.options} series={pichart2.series} type="pie" width={380} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=16t46KAJ-YL-J69qCUVvn3zxFzRzqwGca&ehbc=2E312F" width="860" height="480"></iframe>
                <br />
                <br />
                <div className="row g-3 mb-3">
                    <div className="col-xxl-9">
                        {/* <div className="card bg-light my-3">
                            <div className="card-body p-3">
                                <p className="fs--1 mb-0">
                                    <a href="#!">
                                        <span
                                            className="fas fa-exchange-alt me-2"
                                            data-fa-transform="rotate-90"
                                        />
                                        A payout for <strong>$921.42 </strong>was deposited 13 days ago
                                    </a>
                                    . Your next deposit is expected on{" "}
                                    <strong>Tuesday, March 13.</strong>
                                </p>
                            </div>
                        </div> */}

                        <div className="row g-3">
                            <div className="col-12">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <div className="row flex-between-center">
                                            <div className="col-auto">
                                                <h6 className="mb-2">Candle Chart</h6>
                                            </div>
                                            <div className="col-auto mt-2">
                                                <div className="row g-sm-4">
                                                    <div className="col-12 col-sm-auto">
                                                        <div className="mb-3 pe-4 border-sm-end border-200">
                                                            <h6 className="fs--2 text-600 mb-1">Forecast Hours</h6>
                                                            <div className="d-flex align-items-center">
                                                                <h5 className="fs-0 text-900 mb-0 me-2">2077h</h5>
                                                                <span className="badge rounded-pill badge-soft-primary">
                                                                    <span className="fas fa-caret-up" /> 20.2%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-auto">
                                                        <div className="mb-3 pe-4 border-sm-end border-200">
                                                            <h6 className="fs--2 text-600 mb-1">Workflow Hours</h6>
                                                            <div className="d-flex align-items-center">
                                                                <h5 className="fs-0 text-900 mb-0 me-2">100h</h5>
                                                                <span className="badge rounded-pill badge-soft-success">
                                                                    <span className="fas fa-caret-up" /> 20%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 col-sm-auto">
                                                        <div className="mb-3 pe-0">
                                                            <h6 className="fs--2 text-600 mb-1">Forecast Income</h6>
                                                            <div className="d-flex align-items-center">
                                                                <h5 className="fs-0 text-900 mb-0 me-2">$256,489</h5>
                                                                <span className="badge rounded-pill badge-soft-primary">
                                                                    <span className="fas fa-caret-up" /> 18%
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="card-body pe-0 position-relative"
                                        id="candle-chart"
                                        dir="ltr"
                                    >
                                        <div
                                            className="btn-group position-absolute z-index-1 top-0 d-inline-block"
                                            role="group"
                                            style={{ left: 20, right: 20 }}
                                        >
                                            <button
                                                className="btn btn-falcon-default btn-sm mb-1"
                                                data-zoom="in"
                                            >
                                                <span className="fas fa-plus" />
                                            </button>
                                            <button
                                                className="btn btn-falcon-default btn-sm mb-1"
                                                data-zoom="out"
                                            >
                                                <span className="fas fa-minus" />
                                            </button>
                                        </div>
                                        {/* Find the JS file for the following calendar at: src/js/charts/echarts/candle-chart.js*/}
                                        {/* If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js*/}
                                        <div
                                            className="echart-candle-chart"
                                            data-echart-responsive="true"
                                            data-action-target="candle-chart"
                                        >
                                            {" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>

                </div>
               
            </>

        </React.Fragment>
    )
}
