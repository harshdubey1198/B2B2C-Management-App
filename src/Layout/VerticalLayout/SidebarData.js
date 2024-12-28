export const masterAdminSidebarData = () => [
  {
    label: "Dashboard",
    icon: "mdi mdi-home-variant-outline",
    url: "/dashboard",
  },

  {
    label: "Clients",
    icon: "mdi mdi-account-multiple-outline",
    subItem: [
      { sublabel: "Manage Clients", link: "/clients-management" },
      { sublabel: "Client Portal", link: "/clients-portal" },
      { sublabel: "Track Payments", link: "/clients-payments" },
      { sublabel: "Client Invoices", link: "/clients/invoices" },
      { sublabel: "Client Statements", link: "/clients/statements" },
    ],
  },
  {
    label:"Pricing & Plans",
    icon:"mdi mdi-cash-multiple",
    subItem:[
      {sublabel:"Create New Plan",link:"/create-plan"},
      {sublabel:"Manage Plans",link:"/manage-plan"},
      {sublabel:"All Plans",link:"/pricing"},
    ]
  },
  {
    label: "Firms",
    icon: "mdi mdi-domain",
    subItem: [
      { sublabel: "Manage Firms", link: "/firms" },
      { sublabel: "Create New Firm", link: "/create-firm" },
      { sublabel: "Firm Users", link: "/firmusers-uc" },
      { sublabel: "Firm-Specific Settings", link: "/firms-setting-uc" },
    ],
  },
  {
    label: "Inventory",
    icon: "mdi mdi-archive-outline",
    subItem: [
      { sublabel: "Inventory Management", link: "/inventory-table" },
      { sublabel: "Table Taxation", link: "/table-taxation" },
    ],
  },
  {
    label: "Invoices",
    icon: "mdi mdi-file-document-outline",
    subItem: [
      { sublabel: "View Invoices", link: "/view-invoices" },
      { sublabel: "Recurring Invoices", link: "/invoices/recurring" },
      { sublabel: "Payment Tracking", link: "/invoices/payment-tracking" },
      { sublabel: "Bulk Invoice Generation", link: "/invoices/bulk-generation" },
      { sublabel: "Invoice Templates", link: "/invoices/templates" },
      { sublabel: "Create Quote/Proforma", link: "/quotes/create" },
      { sublabel: "Manage Quotes/Proformas", link: "/quotes/manage" },
      { sublabel: "Convert to Invoice", link: "/quotes/convert" },
    ],
  },
  {
    label: "Vendors",
    icon: "mdi mdi-truck-delivery-outline",
    subItem: [
      // { sublabel: "Manage Vendors", link: "/vendors/manage" },
      { sublabel: "Track Payments", link: "/vendors/payments" },
      { sublabel: "Vendor Invoices", link: "/vendors/invoices" },
      { sublabel: "Supplier Information", link: "/vendors/info" },
      { sublabel: "Supplier Statements", link: "/vendors/statements" },
    ],
  },
  {
    label: "Delivery Challans",
    icon: "mdi mdi-truck-outline",
    subItem: [
      { sublabel: "Create Delivery Challan", link: "/delivery-challans/create" },
      { sublabel: "Manage Delivery Challans", link: "/delivery-challans/manage" },
      { sublabel: "Track Deliveries", link: "/delivery-challans/track" },
    ],
  },
  {
    label: "Credit/Debit Notes",
    icon: "mdi mdi-note-plus-outline",
    subItem: [
      { sublabel: "Create Credit Note", link: "/credit-notes/create" },
      { sublabel: "Manage Credit Notes", link: "/credit-notes/manage" },
      { sublabel: "Apply to Invoices", link: "/credit-notes/apply" },
      { sublabel: "Create Debit Note", link: "/debit-notes/create" },
      { sublabel: "Manage Debit Notes", link: "/debit-notes/manage" },
      { sublabel: "Apply to Purchase Bills", link: "/debit-notes/apply" },
    ],
  },
  {
    label: "Purchase Section",
    icon: "mdi mdi-file-document-edit-outline",
    subItem: [
      { sublabel: "Create Purchase Order", link: "/purchase-orders/create" },
      { sublabel: "Manage Purchase Orders", link: "/purchase-orders/manage" },
      { sublabel: "Record Purchase Bill", link: "/purchase-bills/record" },
      { sublabel: "Manage Purchase Bills", link: "/purchase-bills/manage" },
      { sublabel: "Track Payments", link: "/purchase-bills/payments" },
      { sublabel: "Link to Purchase Orders", link: "/purchase-bills/link-orders" },
    ],
  },
  {
    label: "Preferences",
    icon: "mdi mdi-cog-outline",
    subItem: [
      { sublabel: "General Settings", link: "/preferences/general" },
      { sublabel: "Company Settings", link: "/firms-setting" },
      { sublabel: "Security Settings", link: "/preferences/security" },
      { sublabel: "Notification Settings", link: "/preferences/notifications" },
      { sublabel: "Integration Settings", link: "/preferences/integrations" },
      { sublabel: "Tax Settings", link: "/preferences/tax" },
      { sublabel: "Country-Specific Laws & Tax Settings", link: "/preferences/country-laws" },
    ],
  },
  {
    label: "Support",
    icon: "mdi mdi-help-circle-outline",
    subItem: [
      { sublabel: "Help Desk", link: "/support/help-desk" },
      { sublabel: "Knowledge Base", link: "/support/knowledge-base" },
      { sublabel: "Live Chat", link: "/support/live-chat" },
      { sublabel: "Submit a Ticket", link: "/support/submit-ticket" },
    ],
  },
  {
    label: "Profile",
    icon: "mdi mdi-account-circle-outline",
    subItem: [
      { sublabel: "User Profile", link: "/profile-settings" },
      // { sublabel: "Account Settings", link: "/profile/account-settings" },
      { sublabel: "Logout", link: "/logout" },
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
      icon:"mdi mdi-domain",
      subItem: [
        { sublabel: "Firms", link: "/firms" },
        { sublabel: "Create New Firm", link: "/create-firm" },
        { sublabel: "Firm Users", link: "/firmusers" },
        // { sublabel: "Create Firm", link: "/create-firm" },
        // { sublabel: "Switch Firm", link: "/Switch-firm" },
        { sublabel: "Firm Setting", link: "/firms-setting" }
      ],
    },
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pricing",
    },
    {
      label: "Inventory",
      icon: "mdi mdi-archive-outline",
      subItem: [
        { sublabel: "Inventory Table", link: "/inventory-table" },
        // { sublabel: "Table Form", link: "/add-inventory" },
        {sublabel : "Categories" ,link :"/manage-category"},
        { sublabel: "Table Taxation", link: "/table-taxation" },
        // { sublabel: "Item Config", link: "/item-configuration" },
      ],
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-file-document-outline",
      subItem: [
        // { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "View Invoices", link: "/view-invoices" },
        // { sublabel: "Payments", link: "/payments" },
        // { sublabel: "Expenses", link: "/expenses" },
        // { sublabel: "Reports", link: "/reports" },
      ],
    },

    // {
    //   label:"CRM",
    //   isMainMenu:true,
    // },
    
    


    // {
    //   label: "Authentication",
    //   icon: "mdi mdi-account-circle-outline",
    //   subItem: [
    //     { sublabel: "Login", link: "/auth-login" },
    //     { sublabel: "Register", link: "/auth-register" },
    //     { sublabel: "Recover Password", link: "/recover-password" },
    //     { sublabel: "Lock Screen", link: "/auth-lock-screen" },
    //   ],
    // },
    {
        label: "Settings",
        icon: "mdi mdi-cog-outline",
        subItem: [
          { sublabel: "Profile Settings", link: "/profile-settings" },
          // { sublabel: "Accounts Settings", link: "/accounts-setting" },
          // { sublabel: "Recover Password", link: "/recover-password" },
          // { sublabel: "Lock Screen", link: "/auth-lock-screen" },
        ],
      }
      
      // {
      //   label: "Extra Pages",
      //   icon: "mdi mdi-file-document-outline",
      //   subItem: [
          
      //     { sublabel: "Ui Cards", link: "/ui-cards" },
      //     { sublabel: "Ui Buttons", link: "/ui-buttons" },
      //     { sublabel: "Ui Modals", link: "/ui-modals" },
      //     { sublabel: "Boxicons", link: "/icon-boxicon" },
      //     { sublabel: "MDI", link: "/icons-materialdesign" },
      //     { sublabel: "FA-Icons", link: "/icons-fontawesome" },
      //     { sublabel: "Drip-Icons", link: "/icon-dripicons" },
      //   ],

      // }
  ];
  export const firmAdminSidebarData =()=>[
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },

    // {
    //   label: "google maps",
    //   icon: "mdi mdi-home-variant-outline",
    //   url: "/maps-google",
    // },
    {
      label:"Company",
      icon:"mdi mdi-domain",
      subItem: [
        { sublabel: "Firm Users", link: "/firmusers" },
        { sublabel: "Firm Setting", link: "/firms-setting" }
        ],
    },
    {
      label:"Pricing",
      icon:"mdi mdi-cash-multiple",
      url:"/pricing",
    },
    {
      label: "Inventory",
      icon: "mdi mdi-archive-outline",
      subItem: [
        { sublabel: "Inventory Table", link: "/inventory-table" },
        { sublabel: "Table Form", link: "/add-inventory" },
        {sublabel : "Categories" ,link :"/manage-category"},
        { sublabel: "Table Taxation", link: "/table-taxation" },
        { sublabel: "Vendor Management", link: "/vendors/manage" },
        {sublabel : "Brands" ,link :"/brands"},
        {sublabel : "Manufacturers" ,link :"/manufacturers"},
    
      ],
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-file-document-outline",
      subItem: [
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "View Customers", link: "/view-customers" }
    
      ],
    },
    {
      label:"CRM Leads",
      icon:"mdi mdi-account-multiple-outline",
      subItem: [
        { sublabel: "All Leads", link: "/crm/all-leads" },
        { sublabel: "New Lead", link: "/crm/create-lead" },
        { sublabel: "Analytics", link: "/crm/leads-analytics" },
        { sublabel: "Users" , link:"/crm/crm-users"},
        { sublabel: "Role Management" , link:"/crm/user-roles"},
        { sublabel: "Task Management" , link:"/crm/task-management"},
        // { sublabel: "Reassign Tasks" , link:"/crm/reassign-tasks"},
        
        // { sublabel: "Lead Status", link: "/crm/lead-status" },
      ]
    },
    {
        label: "Settings",
        icon: "mdi mdi-cog-outline",
        subItem: [
          { sublabel: "Profile Settings", link: "/profile-settings" },
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
      label: "Inventory",
      icon: "mdi mdi-archive-outline",
      subItem: [
        { sublabel: "Inventory Management", link: "/inventory-table" },
        {sublabel : "Categories" ,link :"/manage-category"},
        { sublabel: "Table Taxation", link: "/table-taxation" },
      ],
    },
    {
      label: "Invoicing",
      icon: "mdi mdi-file-document-outline",
      subItem: [
        { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "View Customers", link: "/view-customers" },
      ],
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/profile-settings",
    },
  ];
  
  export const generalEmployeeSidebarData = () => [
  
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },

    {
      label: "Inventory",
      icon: "mdi mdi-archive-outline",
      subItem: [
        { sublabel: "Inventory Management", link: "/inventory-table" },
        { sublabel: "Table Form", link: "/add-inventory" },
        {sublabel : "Categories" ,link :"/manage-category"},
        { sublabel: "Table Taxation", link: "/table-taxation" },
        { sublabel: "Vendor Management", link: "/vendors/manage" },
      ],
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/profile-settings",
    }
  ];
  
  export const asmSidebarData = () => [
    {
      Label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      Label : "CRM Leads",
      icon : "mdi mdi-account-multiple-outline",
      subItem : [
        {sublabel:"Daily Tasks",link:"/crm/all-tasks"},
        {sublabel:"All Leads",link:"/crm/all-leads"},
        {sublabel:"New Lead",link:"/crm/create-lead"},
        {sublabel:"Analytics",link:"/crm/leads-analytics"},
        // {sublabel:"Reassign Tasks",link:"/crm/reassign-tasks"},
      ]
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/profile-settings",
    }
  ];

  export const salesManagerSidebarData = () => [
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      label : "CRM Leads",
      icon : "mdi mdi-account-multiple-outline",
      subItem : [
        {sublabel:"Daily Tasks",link:"/crm/all-tasks"},
        {sublabel:"All Leads",link:"/crm/all-leads"},
        {sublabel:"New Lead",link:"/crm/create-lead"},
        {sublabel:"Analytics",link:"/crm/leads-analytics"},
        // {sublabel:"Reassign Tasks",link:"/crm/reassign-tasks"},

      ]
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/profile-settings",
    }
  ];

  export const telecallerSidebarData =() =>[

    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
    },
    {
      label:"CRM Leads",
      icon:"mdi mdi-account-multiple-outline",
      subItem: [
        {sublabel:"Daily Tasks",link:"/crm/all-tasks"},
        // { sublabel: "All Leads", link: "/crm/all-leads" },
        // { sublabel: "New Lead", link: "/crm/create-lead" },
        // { sublabel: "Analytics", link: "/crm/leads-analytics" },
        // { sublabel: "Lead Status", link: "/crm/lead-status" },
      ]
    },
    {
      label: "Settings",
      icon: "mdi mdi-cog-outline",
      url: "/profile-settings",
    }
   
    
    ];
  
  export const viewerSidebarData = () => [
  
    {
      label: "Dashboard",
      icon: "mdi mdi-home-variant-outline",
      url: "/dashboard",
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
      case 'employee':
        return generalEmployeeSidebarData();
      case 'ASM':
        return asmSidebarData();
      case 'SM':
        return salesManagerSidebarData();
      case 'Telecaller':
        return telecallerSidebarData();

        case 'Viewer':
        return viewerSidebarData();
      default:
        return defaultSidebarData();
    }
  };