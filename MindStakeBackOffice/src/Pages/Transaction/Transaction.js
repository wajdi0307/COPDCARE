import axios from 'axios';
import React, { useEffect, useState } from 'react'
import axiosconfig from '../../axiosConfig'


export default function Transaction(props) {
    const [transaction, setTransaction] = useState(props.transaction)
    //console.log(transaction)

    const [user, setUser] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axiosconfig.get(`/users/${transaction.User}`);
                setUser(response[0]);

            } catch (error) {
                console.error(error)
            }
        };
        fetchData().then(user);

    }, []);
    return (
        <React.Fragment>
            <tr>

                <td className="order py-2 align-middle white-space-nowrap">
                    <a href='#' style={{color:'green'}}>
                        <strong>#{transaction._id}</strong>
                    </a>

                    <br />
                    by <strong>{user.UserName}</strong>
                </td>


                <td  >
                    <h6 className="mb-0">${transaction.amount} {transaction.currency}</h6>
                </td>
                <td>
                    <p className=" mb-0">{transaction.created}</p>
                </td>
                <td
                >
                    <span className="badge fs--1 w-100 badge-soft-success">
                        {transaction.status}
                    </span>
                </td>
                <td

                    style={{ width: 90, minWidth: 90 }}
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
