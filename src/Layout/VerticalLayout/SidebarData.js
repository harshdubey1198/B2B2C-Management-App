export const masterAdminSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label: "Clients-Management",
      icon: "mdi mdi-account-multiple-outline",
      url: "/clients-management",
      isHasArrow: true,
    },
   
    {
      label: "Invoicing",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "Payments", link: "/payments-invoice" },
        // { sublabel: "Expenses", link: "/expenses" },
        { sublabel: "Reports", link: "/reports-invoice" },
      ],
    },
    // {
    //   label: "Taxation",
    //   icon: "mdi mdi-file-document-outline",
    //   subItem: [
    //     { sublabel: "Create Tax", link: "/create-tax" },
    //     { sublabel: "View Taxes", link: "/view-taxes" },
    //     { sublabel: "Reports", link: "/reports" },
    //   ],
    // },
    {
      label: "Authentication",
      icon: "mdi mdi-account-circle-outline",
      subItem: [
        { sublabel: "Login", link: "/auth-login" },
        { sublabel: "Register", link: "/auth-register" },
        { sublabel: "Recover Password", link: "/auth-recoverpw" },
        { sublabel: "Lock Screen", link: "/auth-lock-screen" },
      ],
    },
    {
        label: "Settings",
        icon: "mdi mdi-cog-outline",
       
          subItem: [
            { sublabel: "Profile Settings", link: "/profile-settings" },
            { sublabel: "Accounts Settings", link: "/accounts-setting" },
          ],
        },
  ];
  
  export const clientAdminSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label:"Companies",
      icon:"mdi mdi-account-multiple-outline",
      url:"/firms",
      isHasArrow:true
    },
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pages-pricing",
      isHasArrow:true
    },
  

    {
      label: "Invoicing",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Payments", link: "/payments" },
        { sublabel: "Expenses", link: "/expenses" },
        { sublabel: "Reports", link: "/reports" },
      ],
    },
    // {
    //   label: "Taxation",
    //   icon: "mdi mdi-file-document-outline",
    //   subItem: [
    //     { sublabel: "Create Tax", link: "/create-tax" },
    //     { sublabel: "View Taxes", link: "/view-taxes" },
    //     { sublabel: "Reports", link: "/reports" },
    //   ],
    // },
    {
      label: "Authentication",
      icon: "mdi mdi-account-circle-outline",
      subItem: [
        { sublabel: "Login", link: "/auth-login" },
        { sublabel: "Register", link: "/auth-register" },
        { sublabel: "Recover Password", link: "/auth-recoverpw" },
        { sublabel: "Lock Screen", link: "/auth-lock-screen" },
      ],
    },
    {
        label: "Settings",
        icon: "mdi mdi-settings-outline",
        subItem: [
          { sublabel: "Profile Settings", link: "/profile-settings" },
          { sublabel: "Accounts Settings", link: "/accounts-setting" },
          // { sublabel: "Recover Password", link: "/auth-recoverpw" },
          // { sublabel: "Lock Screen", link: "/auth-lock-screen" },
        ],
      }
  ];
  export const accountantSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Payments", link: "/payments" },
        { sublabel: "Reports", link: "/reports-invoice" },
      ],
    },
    {
      label: "Clients",
      icon: "mdi mdi-account-multiple-outline",
      url: "/clients-management",
      isHasArrow: true,
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/settings",
      isHasArrow: true,
    },
  ];
  
  export const generalEmployeeSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Payments", link: "/payments" },
      ],
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/settings",
      isHasArrow: true,
    },
  ];
  
  export const viewerSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
      ],
    },
  ];
  
  export const readOnlySidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
  ];
  
  export const defaultSidebarData = () => [
    {
      label: "Menu",
      isMainMenu: true,
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
      isHasArrow: true,
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/settings",
      isHasArrow: true,
    }
  ];
  
  export const userRolesSidebarData = (role) => {
    switch (role) {
      case 'super_admin':
        return masterAdminSidebarData();
      case 'client_admin':
        return clientAdminSidebarData();
      case 'readOnly':
        return readOnlySidebarData();
      case 'accountant':
        return accountantSidebarData();
      case 'g_emp':
        return generalEmployeeSidebarData();
      case 'Viewer':
        return viewerSidebarData();
      default:
        return defaultSidebarData();
    }
  };
  