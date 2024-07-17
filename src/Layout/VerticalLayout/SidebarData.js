const SidebarData = [
    {
        label: "Menu",
        isMainMenu: true,
    },
    {
        label: "Dashboard",
        icon: "mdi mdi-home-variant-outline",
        url: "/dashboard",
        issubMenubadge: true,
        bgcolor: "bg-primary",
        badgeValue: "3"
    },
    {
        label: "Invoice",
        icon: "mdi mdi-calendar-outline",
        isHasArrow: true,
        url: "/#",
    },
    {
        label: "Email",
        icon: "mdi mdi-email-outline",
        subItem: [
            { sublabel: "Inbox", link: "/#" },
            { sublabel: "Read Email", link: "/#" },
            { sublabel: "Email Compose", link: "/#" },
        ],
    },
    {
        label:"Main Components",
        isMainMenu:true,
    }
    // {
    //     label: "Pages",
    //     isMainMenu: true,
    // },
    // {
    //     label: "Authentication",
    //     icon: "mdi mdi-account-circle-outline",
    //     subItem: [
    //         { sublabel: "Login", link: "/login" },
    //         { sublabel: "Register", link: "/#" },
    //         { sublabel: "Recover Password", link: "/auth-recoverpw" },
    //         { sublabel: "Lock Screen", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Utility",
    //     icon: "mdi mdi-format-page-break",
    //     subItem: [
    //         { sublabel: "Starter Page", link: "/#" },
    //         { sublabel: "Maintenance", link: "/#" },
    //         { sublabel: "Coming Soon", link: "/#" },
    //         { sublabel: "Timeline", link: "/#" },
    //         { sublabel: "FAQs", link: "/#" },
    //         { sublabel: "Pricing", link: "/#" },
    //         { sublabel: "Error 404", link: "/#" },
    //         { sublabel: "Error 500", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Components",
    //     isMainMenu: true,
    // },
    // {
    //     label: "UI Elements",
    //     icon: "mdi mdi-briefcase-variant-outline",
    //     subItem: [
    //         { sublabel: "Alerts", link: "/#" },
    //         { sublabel: "Badge", link: "/#" },
    //         { sublabel: "Breadcrumb", link: "/#" },
    //         { sublabel: "Buttons", link: "/#" },
    //         { sublabel: "Cards", link: "/#" },
    //         { sublabel: "Carousel", link: "/#" },
    //         { sublabel: "Dropdowns", link: "/#" },
    //         { sublabel: "Grid", link: "/#" },
    //         { sublabel: "Images", link: "/#" },
    //         { sublabel: "Lightbox", link: "/#" },
    //         { sublabel: "Modals", link: "/#" },
    //         { sublabel: "Offcanvas", link: "/#" },
    //         { sublabel: "Range Slider", link: "/#" },
    //         { sublabel: "Session Timeout", link: "/#" },
    //         { sublabel: "Pagination", link: "/#" },
    //         { sublabel: "Progress Bars", link: "/#" },
    //         { sublabel: "Placeholders", link: "/#" },
    //         { sublabel: "Tabs & Accordions", link: "/#" },
    //         { sublabel: "Typography", link: "/#" },
    //         { sublabel: "Toasts", link: "/#" },
    //         { sublabel: "Video", link: "/#" },
    //         { sublabel: "Popovers & Tooltips", link: "/#" },
    //         { sublabel: "Rating", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Forms",
    //     icon: "ri-eraser-fill",
    //     issubMenubadge: true,
    //     bgcolor: "bg-danger",
    //     badgeValue: "8",
    //     subItem: [
    //         { sublabel: "Form Elements", link: "/#" },
    //         { sublabel: "Form Validation", link: "/#" },
    //         { sublabel: "Form Advanced Plugins", link: "/#" },
    //         { sublabel: "Form Editor", link: "/#" },
    //         { sublabel: "Form File Upload", link: "/#" },
    //         { sublabel: "Form X-editable", link: "/#" },
    //         { sublabel: "Form Wizard", link: "/#" },
    //         { sublabel: "Form Mask", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Tables",
    //     icon: "ri-table-2",
    //     subItem: [
    //         { sublabel: "Basic Tables", link: "/#" },
    //         { sublabel: "List Js", link: "/#" },
    //         { sublabel: "React Datatables", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Charts",
    //     icon: "ri-bar-chart-line",
    //     subItem: [
    //         { sublabel: "Apex Charts", link: "/#" },
    //         { sublabel: "Chartjs Charts", link: "/#" },
    //         { sublabel: "Re Charts", link: "/#" },
    //         { sublabel: "Knob Charts", link: "/#" },
    //         { sublabel: "Sparkline Charts", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Icons",
    //     icon: "ri-brush-line",
    //     subItem: [
    //         { sublabel: "Box Icons", link: "/#" },
    //         { sublabel: "Material Design", link: "/#" },
    //         { sublabel: "Dripicons", link: "/#" },
    //         { sublabel: "Font Awesome", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Maps",
    //     icon: "ri-map-pin-line",
    //     subItem: [
    //         { sublabel: "Google Maps", link: "/#" },
    //         { sublabel: "Vector Maps", link: "/#" },
    //     ],
    // },
    // {
    //     label: "Multi Level",
    //     icon: "ri-share-line",
    //     subItem: [
    //         { sublabel: "Level 1.1", link: "/#" },
    //         {
    //             sublabel: "Level 1.2", link: "/#",
    //             subMenu: [
    //                 { title: "Level 2.1" },
    //                 { title: "Level 2.2" },
    //             ],
    //         },
    //     ],
    // },
]
export default SidebarData;