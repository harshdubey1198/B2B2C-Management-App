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
        { sublabel: "Create Invoice", link: "/create-invoice" },
        { sublabel: "View Invoices", link: "/view-invoices" },
        { sublabel: "Payments", link: "/payments" },
        { sublabel: "Expenses", link: "/expenses" },
        { sublabel: "Reports", link: "/reports" },
      ],
    },
    {
      label: "Taxation",
      icon: "mdi mdi-file-document-outline",
      subItem: [
        { sublabel: "Create Tax", link: "/create-tax" },
        { sublabel: "View Taxes", link: "/view-taxes" },
        { sublabel: "Reports", link: "/reports" },
      ],
    },
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
        url: "/settings",
        isHasArrow: true,
      }
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
      label: "Taxation",
      icon: "mdi mdi-file-document-outline",
      subItem: [
        { sublabel: "Create Tax", link: "/create-tax" },
        { sublabel: "View Taxes", link: "/view-taxes" },
        { sublabel: "Reports", link: "/reports" },
      ],
    },
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
        url: "/settings",
        isHasArrow: true,
      }
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
      case 'Master':
        return masterAdminSidebarData();
      case 'Client_Admin':
        return clientAdminSidebarData();
      case 'readOnly':
        return readOnlySidebarData();
      default:
        return defaultSidebarData();
    }
  };
  