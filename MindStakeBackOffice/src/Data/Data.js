// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

import axios from "axios";

import React, { useEffect, useState } from 'react'

export default function Data() {
    

}

const Trans = () => {

   

}

const Revv = () => {
}

const Raised = () => {
   
}

const Don = () => {
   
}



console.log(<Trans />)
//console.log(<Data />)
// Analytics Cards Data
export const cardsData = [
    {
        title: "Raised",
        color: {
            backGround: "linear-gradient(135deg, #bd6772, #53223f",
            boxShadow: "0px 5px 10px 0px #bd6772",
        },
        barValue: 70,
        value: <Raised/>,
        png: UilUsdSquare,
        series: [
            {
                name: "Raised",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Transactions",
        color: {
            backGround: "linear-gradient(45deg, #02a95c, #026838)",
            boxShadow: "0px 5px 10px 0px rgb(162, 245, 162)",
        },
        barValue: 80,
        value: <Revv />,
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Transaction",
                data: [6, 6, 0.6, 0.6, 12, 6, 6, 6, 6, 24, 12, 24, 18, 18, 12],
            },
        ],
    },
    {
        title: "Donations",
        color: {
            backGround:
                "linear-gradient( 135deg, rgba(253, 200, 3) 20%, rgba(253, 155, 2) 100% )",
            boxShadow: "0px 5px 10px 0px #F9D59B",
        },
        barValue: 60,
        value: <Don/>,
        png: UilClipboardAlt,
        series: [
            {
                name: "Donation",
                data: [10,5,10,10,10,5,100,5],
            },
        ],
    },

];

// Recent Update Card Data
export const UpdatesData = [
    {
        img: img1,
        name: "Andrew Thomas",
        noti: "has ordered Apple smart watch 2500mh battery.",
        time: "25 seconds ago",
    },
    {
        img: img2,
        name: "James Bond",
        noti: "has received Samsung gadget for charging battery.",
        time: "30 minutes ago",
    },
    {
        img: img3,
        name: "Iron Man",
        noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
        time: "2 hours ago",
    },
];