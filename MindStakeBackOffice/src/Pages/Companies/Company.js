import React, { useState } from 'react'

export default function Company(props) {

    const [bank, setBank] = useState(props.bank)
console.log("aaaa")

    return (
        <React.Fragment>
            <div className="card mb-3" style={{ width: '400px', marginLeft: '20px' }}  >

                <div className="card-header position-relative min-vh-25 ">
                    <div
                        className="bg-holder rounded-3 rounded-bottom-0"
                        style={{ backgroundImage: `url(${bank.image})` }}
                    />

                </div>
                <div className="card-body" style={{ textAlign: 'center' }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="mb-1">
                                {bank.name}
                            </h4>
                            <br/>
                            <h5 className="fs-0 mb-2 fw-normal" style={{ textAlign: 'left' }}>
                                <u>Address:</u>&nbsp;{bank.address}
                            </h5>
                            
                            <h5 className="fs-0 mb-2 fw-normal" style={{ textAlign: 'left' }}>
                                <u>Capital:</u>&nbsp;{bank.capital}
                            </h5>
                            <h5 className="fs-0 mb-2 fw-normal" style={{ textAlign: 'left' }}>
                                <u>Employees:</u>&nbsp;{bank.employees}
                            </h5>
                            <h5 className="fs-0 mb-2 fw-normal" style={{ textAlign: 'left' }}>
                                <u>Manager:</u>&nbsp;{bank.manager}
                            </h5>
                            
                            <h5 className="fs-0 mb-2 fw-normal" style={{ textAlign: 'left' }}>
                                <u>Interest Rate:</u>&nbsp;{bank.interest_rate}
                            </h5>
                            <br/>
                            <p className="text-500 mb-1"><u>Email:</u>&nbsp;{bank.email}</p>
                            <p className="text-500 mb-1"><u>Phone:</u>&nbsp;{bank.phone}</p>
                            <p className="text-500 mb-3"><u>Fax:</u>&nbsp;{bank.fax}</p>

                            <a className="btn btn-success btn-sm px-3"   href={`${bank.website}`} target="_blank" type="button">
                                Visit Website
                            </a>
                           
                            <div className="border-dashed-bottom my-4 d-lg-none" />
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
