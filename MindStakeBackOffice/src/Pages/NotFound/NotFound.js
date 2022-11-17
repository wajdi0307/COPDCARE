import React from 'react'

export default function NotFound() {
    return (
        <React.Fragment>
            <div className="row flex-center min-vh-100 py-6 text-center">
                <div className="col-sm-10 col-md-8 col-lg-6 col-xxl-5">
                    <a className="d-flex flex-center mb-4" href="../../index.html">
                        <img
                            className="me-2"
                            src="../../assets/img/icons/spot-illustrations/falcon.png"
                            alt=""
                            width={58}
                        />
                        <span className="font-sans-serif fw-bolder fs-5 d-inline-block">
                            falcon
                        </span>
                    </a>
                    <div className="card">
                        <div className="card-body p-4 p-sm-5">
                            <div className="fw-black lh-1 text-300 fs-error">404</div>
                            <p className="lead mt-4 text-800 font-sans-serif fw-semi-bold w-md-75 w-xl-100 mx-auto">
                                The page you're looking for is not found.
                            </p>
                            <hr />
                            <p>
                                Make sure the address is correct and that the page hasn't moved. If
                                you think this is a mistake,{" "}
                                <a href="mailto:info@exmaple.com">contact us</a>.
                            </p>
                            <a className="btn btn-primary btn-sm mt-3" href="../../index.html">
                                <span className="fas fa-home me-2" />
                                Take me home
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
