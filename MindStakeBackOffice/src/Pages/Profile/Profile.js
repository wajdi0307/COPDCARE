import axios from 'axios'
import React, { useEffect, useState } from 'react'
import axiosconfig from '../../axiosConfig'


export default function Profile() {
    var connected = JSON.parse(localStorage.getItem('user'))

    const [connect, setConnect] = useState({})

    const [editUser, setEditUser] = useState({})

    const [imageP, setImageP] = useState()

    const [Pwd, setPwd] = useState({})

    const [email, setEmail] = useState({})





    useEffect(() => {
        const ferchData = async () => {
            await axiosconfig.get(`/users/${connected.userId}`)
                .then(res => {
                    console.log(res.data)
                    setConnect(res.data[0])
                    //setEditUser(res.data[0])
                    console.log(editUser)
                    setEditUser({
                        ...editUser, userId: res.data[0]._id, Email: res.data[0].Email, Phone: res.data[0].Phone,
                        FirstName: res.data[0].FirstName, LastName: res.data[0].LastName, UserName: res.data[0].UserName,
                        ImageProfile: res.data[0].ImageProfile
                    })
                    console.log(editUser)
                }
                )
        }
        ferchData().then(connect, editUser)
        console.log(connect)

    }, [])





    const doModifyEmail = async (e) => {
        e.preventDefault()

        const data = {
            old_Email: connect.Email,
            new_Email: email.new_Email,
            confirm_Email: email.confirm_Email
        }

        await axiosconfig.put(`/users/changeEmail/${connected.userId}`, data)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChangeEmail = (e) => {

        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    const doModify = async (e) => {
        e.preventDefault()

        const data = {
            old_Password: Pwd.old_Password,
            new_Password: Pwd.new_Password,
            confirm_Password: Pwd.confirm_Password
        }

        await axiosconfig.put(`/users/changePassword/${connected.userId}`, data)
            .then(res => {
                window.location.reload()
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleChangePwd = (e) => {

        setPwd({ ...Pwd, [e.target.name]: e.target.value })
    }


    const updateProfile = async (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("FirstName", editUser.FirstName)
        data.append("LastName", editUser.LastName)
        data.append("UserName", editUser.UserName)
        data.append("Email", editUser.Email)
        data.append("Phone", editUser.Phone)
        data.append("file", imageP)

        await axiosconfig.put(`/users/updateAdmin/${connected.userId}`, data)
            .then(res => {
                console.log(res.data)

                setEditUser(res.data)
                console.log(editUser)

            }
            )
            .catch(err => console.error(err))

        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(editUser))
        window.location.reload()
    }

    const handleChange = (e) => {
        e.preventDefault()
        setEditUser({ ...editUser, [e.target.name]: e.target.value })
    }

    const handleChangeImgP = (e) => {
        e.preventDefault()
        setImageP(e.target.files[0])
    }


    return (
        <React.Fragment>
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3 btn-reveal-trigger">
                            <div className="card-header position-relative min-vh-25 mb-8">
                                <div className="cover-image">
                                    <div
                                        className="bg-holder rounded-3 rounded-bottom-0"
                                        style={{ backgroundImage: "url(../../assets/img/generic/4.jpg)" }}
                                    ></div>
                                    {/*/.bg-holder*/}
                                    <input className="d-none" id="upload-cover-image" type="file" />
                                    <label
                                        className="cover-image-file-input"
                                        htmlFor="upload-cover-image"
                                    >
                                        <span className="fas fa-camera me-2" />
                                        <span>Change cover photo</span>
                                    </label>
                                </div>
                                <div className="avatar avatar-5xl avatar-profile shadow-sm img-thumbnail rounded-circle">
                                    <div className="h-100 w-100 rounded-circle overflow-hidden position-relative">
                                        {" "}
                                        <div className="avatar-name rounded-circle">
                                            {connect.ImageProfile !== "avatar.png" && <img src={`https://storage.googleapis.com/mindstake_bucket/${connect.ImageProfile}`} alt="admin" style={{ borderRadius: '50%' }} />}

                                            {connect.ImageProfile === "avatar.png" && <span>{connect.UserName.charAt(0).toUpperCase()}</span>}
                                        </div>
                                        {/* <input className="d-none" id="profile-image" name='ImageProfile' type="file" onChange={updateImgP} />
                                        <label
                                            className="mb-0 overlay-icon d-flex flex-center"
                                            htmlFor="profile-image"
                                        >
                                            {/* <span className="bg-holder overlay overlay-0" /> */}
                                        {/* <span className="z-index-1 text-white dark__text-white text-center fs--1">
                                                <span className="fas fa-camera" />
                                                <span className="d-block" >Update</span>
                                            </span> 
                                        </label> */}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div class="col-lg-8" style={{ marginLeft: '4%', paddingBottom: '3%', marginTop: '-20px' }}>
                                    <h4 class="mb-1"> {connect.FirstName}&nbsp;{connect.LastName}
                                        <span data-bs-toggle="tooltip" data-bs-placement="right" title="" data-bs-original-title="Verified" aria-label="Verified">
                                            <small class="fa fa-check-circle text-primary" data-fa-transform="shrink-4 down-2"></small>
                                        </span>
                                    </h4>
                                </div>
                                {/* <div className="col ps-2 ps-lg-3">
                                    
                                    <a className="d-flex align-items-center mb-2" href="#">
                                        <img
                                            className="align-self-center me-2"
                                            src="../../assets/img/logos/g.png"
                                            alt="Generic placeholder image"
                                            width={30}
                                        />
                                        <div className="flex-1">
                                            <h6 className="mb-0">Facebook</h6>
                                        </div>
                                    </a>
                                    <a className="d-flex align-items-center mb-2" href="#">
                                        <img
                                            className="align-self-center me-2"
                                            src="../../assets/img/logos/apple.png"
                                            alt="Generic placeholder image"
                                            width={30}
                                        />
                                        <div className="flex-1">
                                            <h6 className="mb-0">Apple</h6>
                                        </div>
                                    </a>
                                    <a className="d-flex align-items-center mb-2" href="#">
                                        <img
                                            className="align-self-center me-2"
                                            src="../../assets/img/logos/hp.png"
                                            alt="Generic placeholder image"
                                            width={30}
                                        />
                                        <div className="flex-1">
                                            <h6 className="mb-0">Hewlett Packard</h6>
                                        </div>
                                    </a>
                                </div> */}
                            </div>

                        </div>

                    </div>

                </div>
                <div className="row g-0">
                    <div className="col-lg-8 pe-lg-2">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h5 className="mb-0">Profile Settings</h5>
                            </div>
                            <div className="card-body bg-light">
                                <form className="row g-3" onSubmit={updateProfile}>
                                    <div className="col-lg-6">
                                        <label className="form-label" htmlFor="first-name">
                                            First Name
                                        </label>
                                        <input
                                            className="form-control"
                                            id="first-name"
                                            type="text"
                                            name='FirstName'
                                            value={editUser.FirstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label" htmlFor="last-name">
                                            Last Name
                                        </label>
                                        <input
                                            className="form-control"
                                            id="last-name"
                                            type="text"
                                            name='LastName'
                                            value={editUser.LastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label" htmlFor="email1">
                                            Username
                                        </label>
                                        <input
                                            className="form-control"
                                            id="email1"
                                            type="text"
                                            name='UserName'
                                            value={editUser.UserName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="form-label" htmlFor="email2">
                                            Phone
                                        </label>
                                        <input
                                            className="form-control"
                                            id="email2"
                                            type="number"
                                            name='Phone'
                                            value={editUser.Phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className="form-label" htmlFor="email3">
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            id="email3"
                                            type="email"
                                            name='Email'
                                            value={editUser.Email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label className="form-label" >
                                            Role
                                        </label>
                                        <input
                                            className="form-control"
                                            name="Role"
                                            defaultValue={"ADMIN"}
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                    <div class="col-lg-12">
                                        <label class="form-label" for="customFile">Profile picture</label>
                                        <input
                                            class="form-control"
                                            id="customFile"
                                            type="file"
                                            name='ImageProfile'
                                            onChange={handleChangeImgP}
                                        />
                                    </div>

                                    <div className="col-12 d-flex justify-content-end">
                                        <button className="btn btn-primary" type="submit">
                                            Update{" "}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4 ps-lg-2">
                        <div className="sticky-sidebar">
                            {/* <div className="card mb-3 overflow-hidden">
                                <div className="card-header">
                                    <h5 className="mb-0">Account Settings</h5>
                                </div>
                                <div className="card-body bg-light">
                                    <h6 className="fw-bold">
                                        What mode you want to use ?
                                        <span
                                            className="fs--2 ms-1 text-primary"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="You can choose eather light or dark mode to display  in your admin account"
                                        >
                                            <span className="fas fa-question-circle" />
                                        </span>
                                    </h6>


                                    <div class="form-check mb-0 lh-1 ">
                                        <input class="form-check-input" id="flexRadioDefault1" type="radio" value="light" data-theme-control="theme" />
                                        <label class="form-check-label" for="flexRadioDefault1">Light</label>
                                    </div>
                                    <div class="form-check mb-0 lh-1">
                                        <input class="form-check-input" id="flexRadioDefault2" type="radio" value="dark" data-theme-control="theme" />
                                        <label class="form-check-label" for="flexRadioDefault2">Dark</label>
                                    </div>


                                    
                                </div>
                            </div> */}

                            <div className="card mb-3">
                                <div className="card-header">
                                    <h5 className="mb-0">Change Password</h5>
                                </div>
                                <div className="card-body bg-light">
                                    <form onSubmit={doModify} className='needs-validation' noValidate=''>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="old-password" >
                                                Old Password
                                            </label>
                                            <input
                                                className="form-control"
                                                id="old-password"
                                                type="password"
                                                name="old_Password"
                                                onChange={handleChangePwd}
                                                required
                                            />
                                            <div class="invalid-feedback">Please enter your old password.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="new-password">
                                                New Password
                                            </label>
                                            <input
                                                className="form-control"
                                                id="new-password"
                                                type="password"
                                                name="new_Password"
                                                onChange={handleChangePwd}
                                                required
                                            />
                                            <div class="invalid-feedback">Please enter your new password.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="confirm-password">
                                                Confirm Password
                                            </label>
                                            <input
                                                className="form-control"
                                                id="confirm-password"
                                                type="password"
                                                name="confirm_Password"
                                                onChange={handleChangePwd}
                                                required
                                            />
                                            <div class="invalid-feedback">Please confirm your new password.</div>

                                        </div>
                                        <button className="btn btn-primary d-block w-100" type="submit">
                                            Update Password{" "}
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="mb-0">Danger Zone</h5>
                                </div>
                                <div className="card-body bg-light">
                                    <h5 className="fs-0">Transfer Ownership</h5>
                                    <p className="fs--1">
                                        Transfer this account to another user or to an organization where
                                        you have the ability to create repositories.
                                    </p>
                                    <a className="btn btn-falcon-warning d-block" data-bs-toggle="modal" data-bs-target="#transferOwnership">
                                        Transfer
                                    </a>
                                    <div className="border-dashed-bottom my-4" />
                                    <h5 className="fs-0">Delete this account</h5>
                                    <p className="fs--1">
                                        Once you delete a account, there is no going back. Please be
                                        certain.
                                    </p>
                                    <a className="btn btn-falcon-danger d-block" href="#!">
                                        Deactivate Account
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                        className="modal fade"
                        id="transferOwnership"
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
                                            Change Email address{" "}
                                        </h4>
                                    </div>
                                    <div className="p-4 pb-0">
                                        <form onSubmit={doModifyEmail} className='needs-validation' noValidate=''>


                                            <div className="mb-3">
                                                <label className="col-form-label" htmlFor="recipient-name">
                                                    Old Email:
                                                </label>
                                                <input className="form-control" id="recipient-name" type="email"
                                                    name='old_Email'
                                                    value={connect.Email}
                                                    onChange={handleChangeEmail}
                                                    required
                                                    disabled
                                                />
                                                <div class="invalid-feedback">Please enter your old email.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="col-form-label" htmlFor="recipient-name">
                                                    New Email:
                                                </label>
                                                <input className="form-control" id="recipient-name" type="email"
                                                    name='new_Email'
                                                    onChange={handleChangeEmail}
                                                    required
                                                />
                                                <div class="invalid-feedback">Please enter your new email.</div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="col-form-label" htmlFor="recipient-name">
                                                    Confirm Email:
                                                </label>
                                                <input className="form-control" id="recipient-name" type="email"
                                                    name='confirm_Email'
                                                    onChange={handleChangeEmail}
                                                    required
                                                />
                                                <div class="invalid-feedback">Please confirm your email.</div>
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
            </>

        </React.Fragment>
    )
}
