import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosconfig from '../../axiosConfig'


export default function Donation(props) {
    const [donation, setDonation] = useState(props.donation)
    //console.log(transaction)

    const [user, setUser] = useState('')
    const [receiver, setReceiver] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/${donation.Sender}`);
                setUser(response[0]);

            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(user);

    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/${donation.Receiver}`);
                setReceiver(response[0]);

            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(receiver);

    }, []);
    return (
        <React.Fragment>
            <tr>

                <td className="order py-2 align-middle white-space-nowrap">
                    <a href='#' style={{color:'green'}}>
                        <strong>#{donation._id}</strong>
                    </a>

                    <br />
                    by <strong>{user.UserName}</strong>
                </td>
                <td>
                    <strong>{receiver.Email}</strong>
                </td>

                <td  >
                    <h6 className="mb-0">{donation.amount} <small>Gc</small></h6>
                </td>
                <td>
                    <p className=" mb-0">{donation.created}</p>
                </td>

                <td

                    style={{ width: 100, minWidth: 100 }}
                >
                    <select className="form-select form-select-sm px-2 bg-transparent">
                        <option>Action</option>
                        <option>Archive</option>
                        <option>Delete</option>
                    </select>
                </td>
            </tr>
        </React.Fragment>
    )
}
