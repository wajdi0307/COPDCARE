import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = (e) => {
    localStorage.removeItem('resetPW');
  
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, data)
      .then((res) => {
        if (res.data.user.Role === "DOCTOR" ||res.data.user.Role === "ADMIN" ) {
          console.log(res);
          setToken(res.data.token);
          navigate("/dashboard");
          window.location.reload();
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(localStorage.getItem("user"));
        } else if(res.data.user.Role === "PATIENT"){
          console.log(res);
          setToken(res.data.token);
          navigate("/");
          window.location.reload();
          localStorage.setItem("user", JSON.stringify(res.data));
          console.log(localStorage.getItem("user"));
        }
        else {
          alert("Your account is not an Admin account");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <React.Fragment>
      <div className="row min-vh-100 flex-center g-0">
        <div className="col-lg-8 col-xxl-5 py-3 position-relative">
          <img
            className="bg-auth-circle-shape"
            style={{
              filter:
                "brightness(0.5)contrast(2)hue-rotate(210deg)saturate(12)",
            }}
            src="../../../assets/img/icons/spot-illustrations/bg-shape.png"
            alt=""
            width={250}
          />
          <img
            className="bg-auth-circle-shape-2"
            style={{
              filter:
                "brightness(0.5)contrast(2)hue-rotate(210deg)saturate(12)",
            }}
            src="../../../assets/img/icons/spot-illustrations/shape-1.png"
            alt=""
            width={150}
          />
          <div className="card overflow-hidden z-index-1">
            <div className="card-body p-0">
              <div className="row g-0 h-100">
                <div
                  className="col-md-5 text-center"
                  style={{
                    backgroundImage:
                      "linear-gradient(-45deg, #007c1f, #00ac39)",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="position-relative p-4 pt-md-5 pb-md-7 light">
                    <div
                      className="bg-holder bg-auth-card-shape"
                      style={{
                        backgroundImage:
                          "url(../../../assets/img/icons/spot-illustrations/half-circle.png)",
                      }}
                    ></div>
                    {/*/.bg-holder*/}
                    <div className="z-index-1 position-relative">
                      <a
                        className="link-light mb-4 font-sans-serif fs-4 d-inline-block fw-bolder"
                        href="../../../index.html"
                      >
                        CopdCare
                      </a>
                      <p className="opacity-75 text-white">
                        With the power of CopdCare, you can now focus only on
                        functionaries for your digital business, while leaving
                        the UI design on us!
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 mb-4 mt-md-4 mb-md-5 light">
                    <p className="mb-0 mt-4 mt-md-5 fs--1 fw-semi-bold text-white opacity-75">
                      Read our{" "}
                      <a
                        className="text-decoration-underline text-white"
                        href="#!"
                      >
                        terms
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-decoration-underline text-white"
                        href="#!"
                      >
                        conditions{" "}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-7 d-flex flex-center">
                  <div className="p-4 p-md-5 flex-grow-1">
                    <div className="row flex-between-center">
                      <div className="col-auto">
                        <h3>Account Login</h3>
                      </div>
                    </div>
                    <form onSubmit={doLogin}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="card-email">
                          Email address
                        </label>
                        <input
                          className="form-control"
                          id="card-email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between">
                          <label className="form-label" htmlFor="card-password">
                            Password
                          </label>
                        </div>
                        <input
                          className="form-control"
                          id="card-password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="row flex-between-center">
                        <div className="col-auto">
                          <div className="form-check mb-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="card-checkbox"
                              defaultChecked="checked"
                              style={{ backgroundColor: "#007c1f" }}
                            />
                            <label
                              className="form-check-label mb-0"
                              htmlFor="card-checkbox"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-auto">
                          <label htmlFor="password">
                            Password:{" "}
                            <Link
                              to="/forgotpassword"
                              className="login-screen__forgotpassword"
                            >
                              Forgot Password?
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button
                          className="btn d-block w-100 mt-3"
                          style={{ backgroundColor: "#007c1f", color: "white" }}
                          type="submit"
                          name="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
