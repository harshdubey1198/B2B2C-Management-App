// Import Images
import img2 from "../../assets/images/users/avatar-2.jpg";
import img3 from "../../assets/images/users/avatar-3.jpg";
import img6 from "../../assets/images/users/avatar-6.jpg";
import img4 from "../../assets/images/users/avatar-4.jpg";


// Latest Transation 

const LatestTransationData = [
    {
        id: "customCheck1",
        clientId: "#AP1234",
        clientName: "David Wiley",
        src:img2,
        date: "02 Nov, 2019",
        price: "1234",
        quantity: "1",
        color: "success",
        status: "Confirm"
    },
    {
        id: "customCheck2",
        clientId: "#AP1235",
        clientName: "Walter Jones",
        date: "04 Nov, 2019",
        price: "822",
        quantity: "2",
        color: "success",
        status: "Confirm"
    },
    {
        id: "customCheck3",
        clientId: "#AP1236",
        clientName: "Eric Ryder",
        src:img3,
        date: "	05 Nov, 2019",
        price: "1153",
        quantity: "1",
        color: "danger",
        status: "Cancel"
    },
    {
        id: "customCheck4",
        clientId: "#AP1237",
        clientName: "Kenneth Jackson",
        date: "06 Nov, 2019",
        price: "1365",
        quantity: "1",
        color: "success",
        status: "Confirm"
    },
    {
        id: "customCheck5",
        clientId: "#AP1238",
        clientName: "Ronnie Spiller",
        src:img6,
        date: "08 Nov, 2019",
        price: "740",
        quantity: "2",
        color: "warning",
        status: "Pending"
    },
];

// Order Status
const OrderStatusData = [
    {
        id: 1,
        title: "Completed",
        icon: "ri-checkbox-circle-line",
        color: "success",
        width: "70",
    },
    {
        id: 2,
        title: "Pending",
        icon: "ri-calendar-2-line",
        color: "warning",
        width: "45",
    },
    {
        id: 3,
        title: "Cancel",
        icon: "ri-close-circle-line",
        color: "danger",
        width: "19",
    },
]

// Overview

const OverViewData = [
    {
        id: 1,
        title: "Expenses",
        count: "8,524",
        percentage: "1.2",
        color: "primary"
    },
    {
        id: 2,
        title: "Maintenance",
        count: "8,524",
        percentage: "2.0",
        color: "light"
    },
    {
        id: 3,
        title: "Profit",
        count: "8,524",
        percentage: "0.4",
        color: "danger"
    },
];

// SocialSource

const SocialSourceData = [
    {
        id: 1,
        title: "Facebook",
        count: "125",
        icon: "ri ri-facebook-circle-fill",
        bgcolor: "primary"
    },
    {
        id: 2,
        title: "Twitter",
        count: "112",
        icon: "ri ri-twitter-fill text-white",
        bgcolor: "info"
    },
    {
        id: 3,
        title: "Instagram",
        count: "104",
        icon: "ri ri-instagram-line text-white",
        bgcolor: "danger"
    },
];
 
// Notifications

const NotificationsData = [
    {
        id:1,
        name:"Scott Elliott",
        desc:"If several languages coalesce",
        time:" 20 min ago",
        src:img2,        
    },
    {
        id:2,
        name:"Team A",
        desc:"Team A Meeting 9:15 AM",
        time:"9:00 am",
        icon:"mdi mdi-account-supervisor"
    },
    {
        id:3,
        name:"Frank Martin",
        desc:"Neque porro quisquam est",
        time:" 8:54 am",
        src:img3,        
    },{
        id:4,
        name:"Updates",
        desc:"It will be as simple as fact",
        time:"27-03-2020",
        icon:"mdi mdi-email-outline"       
    },{
        id:5,
        name:"Terry Garrick",
        desc:"At vero eos et accusamus et",
        time:"27-03-2020",
        src:img4,        
    }

];


export { LatestTransationData, OrderStatusData, OverViewData, SocialSourceData, NotificationsData }