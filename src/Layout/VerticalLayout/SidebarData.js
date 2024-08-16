export const masterAdminSidebarData = () => [
   
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
     
    },
    {
      label: "Clients-Management",
      icon: "mdi mdi-account-multiple-outline",
      url: "/clients-management",
      
    },
    {
      label: "Plans",
      icon: "mdi mdi-printer",
      subItem: [
        { sublabel: "Create Plan", link: "/create-plan" },
        { sublabel: "Manage Plan", link: "/manage-plan" },
      ],
    },
   
    {
      label: "Invoicing",
      icon: "mdi mdi-printer",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "Payments", link: "/payments-invoice" },
        // { sublabel: "Expenses", link: "/expenses" },
        { sublabel: "Reports", link: "/reports-invoice" },
      ],
    },
    {
      label:"Maintenance",
      icon:"mdi mdi-tools",
      url:"/maintenance",
    }
    ,
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pages-pricing",
    }
,
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
        { sublabel: "Recover Password", link: "/recover-password" },
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
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      label:"Companies",
      icon:"mdi mdi-account-multiple-outline",
      subItem: [
        { sublabel: "Firms", link: "/firms" },
        { sublabel: "Firm Users", link: "/firmusers" },
        { sublabel: "Create Firm", link: "/create-firm" },
        { sublabel: "Switch Firm", link: "/Switch-firm" },
        { sublabel: "Firm Setting", link: "/firms-setting" }
      ],
    },
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pages-pricing",
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
    {
      label: "Inventory",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "Inventory Table", link: "/inventory-table" },
        { sublabel: "Table Form", link: "/add-inventory" },
        { sublabel: "Table Taxation", link: "/table-taxation" },
        { sublabel: "Item Config", link: "/item-configuration" },
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

    // {
    //   label:"Below-options",
    //   isMainMenu:true,
    // },
    {
      label: "Authentication",
      icon: "mdi mdi-account-circle-outline",
      subItem: [
        { sublabel: "Login", link: "/auth-login" },
        { sublabel: "Register", link: "/auth-register" },
        { sublabel: "Recover Password", link: "/recover-password" },
        { sublabel: "Lock Screen", link: "/auth-lock-screen" },
      ],
    },
    {
        label: "Settings",
        icon: "mdi mdi-cog-outline",
        subItem: [
          { sublabel: "Profile Settings", link: "/profile-settings" },
          { sublabel: "Accounts Settings", link: "/accounts-setting" },
          // { sublabel: "Recover Password", link: "/recover-password" },
          // { sublabel: "Lock Screen", link: "/auth-lock-screen" },
        ],
      },
      {
        label: "Extra Pages",
        icon: "mdi mdi-file-document-outline",
        subItem: [
          
          { sublabel: "Ui Cards", link: "/ui-cards" },
          { sublabel: "Ui Buttons", link: "/ui-buttons" },
          { sublabel: "Ui Modals", link: "/ui-modals" },
          { sublabel: "Boxicons", link: "/icon-boxicon" },
          { sublabel: "MDI", link: "/icons-materialdesign" },
          { sublabel: "FA-Icons", link: "/icons-fontawesome" },
          { sublabel: "Drip-Icons", link: "/icon-dripicons" },
        ],

      }
  ];
  export const firmAdminSidebarData =()=>[
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      label:"Companies",
      icon:"mdi mdi-account-multiple-outline",
      subItem: [
        { sublabel: "Firms", link: "/firms" },
        // { sublabel: "Manage Firm", link: "/manage-firm" },
        { sublabel: "Create Firm", link: "/create-firm" },
        { sublabel: "Switch Firm", link: "/Switch-firm" },
        { sublabel: "Firm Setting", link: "/firms-setting" }
      ],
    },
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pages-pricing",
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
    {
      label: "Inventory",
      icon: "mdi mdi-cash-multiple",
      subItem: [
        { sublabel: "Inventory Table", link: "/inventory-table" },
        { sublabel: "Table Form", link: "/add-inventory" },
        { sublabel: "Table Taxation", link: "/table-taxation" },
        { sublabel: "Item Config", link: "/item-configuration" },
      ],
    },
{
      label: "Authentication",
      icon: "mdi mdi-account-circle-outline",
      subItem: [
        { sublabel: "Login", link: "/auth-login" },
        { sublabel: "Register", link: "/auth-register" },
        { sublabel: "Recover Password", link: "/recover-password" },
        { sublabel: "Lock Screen", link: "/auth-lock-screen" },
      ],
    },
    {
        label: "Settings",
        icon: "mdi mdi-cog-outline",
        subItem: [
          { sublabel: "Profile Settings", link: "/profile-settings" },
          { sublabel: "Accounts Settings", link: "/accounts-setting" },
          // { sublabel: "Recover Password", link: "/recover-password" },
          // { sublabel: "Lock Screen", link: "/auth-lock-screen" },
        ],
      },
      {
        label: "Extra Pages",
        icon: "mdi mdi-file-document-outline",
        subItem: [
          
          { sublabel: "Ui Cards", link: "/ui-cards" },
          { sublabel: "Ui Buttons", link: "/ui-buttons" },
          { sublabel: "Ui Modals", link: "/ui-modals" },
          { sublabel: "Boxicons", link: "/icon-boxicon" },
          { sublabel: "MDI", link: "/icons-materialdesign" },
          { sublabel: "FA-Icons", link: "/icons-fontawesome" },
          { sublabel: "Drip-Icons", link: "/icon-dripicons" },
        ],

      }
  ]

  export const accountantSidebarData = () => [
   
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
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
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/settings",
    },
  ];
  
  export const generalEmployeeSidebarData = () => [
  
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
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
    },
  ];
  
  export const viewerSidebarData = () => [
  
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
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
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
  ];
  
  export const defaultSidebarData = () => [
    {
      label: "Menu",
    },
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/settings",
    }
  ];
  
  export const userRolesSidebarData = (role) => {
    switch (role) {
      case 'super_admin':
        return masterAdminSidebarData();
      case 'client_admin':
        return clientAdminSidebarData();
      case 'firm_admin':
        return firmAdminSidebarData();
      case 'accountant':
          return accountantSidebarData();
      case 'readOnly':
        return readOnlySidebarData();
      case 'g_emp':
        return generalEmployeeSidebarData();
      case 'Viewer':
        return viewerSidebarData();
      default:
        return defaultSidebarData();
    }
  };
  