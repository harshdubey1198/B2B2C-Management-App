import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";
// Invoicing routes
import CreateInvoice from "../Pages/Invoicing/index";
import ViewInvoice from "../Pages/Invoicing/view.jsx";
import PaymentsInvoice from "../Pages/Invoicing/payments.jsx";
import ReportsInvoice from "../Pages/Invoicing/reports.jsx";
import CategoryManager from "../Pages/Inventory-MNG/categoryManager.jsx";

import Firm from "../Pages/Firms/FirmsTable.jsx";
// Import Calender


// Import E-mail
// import Inbox from "../Pages/E-mail/Inbox";
// import ReadEmail from "../Pages/E-mail/ReadEmail";
// import EmailCompose from "../Pages/E-mail/EmailCompose";

// Import Authentication pages

// import Login from "../Pages/Authentication/Login";
// import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/AuthenticationPages/Logout.js";
import Register from "../Pages/AuthenticationPages/Register.js";
// import UserProfile from "../Pages/Authentication/user-profile";
import ResetPassword from "../Pages/AuthenticationPages/ResetPassword.jsx";


// inventory mngmnt

import InventoryTable from "../Pages/Inventory-MNG/InventoryTable.jsx";
import TableForm from "../Pages/Inventory-MNG/TableForm.jsx";
import TableTaxation from "../Pages/Inventory-MNG/TableTaxation.jsx";
import ItemConfiguration from "../Pages/Inventory-MNG/ItemConfiguration.jsx";

// Import Authentication Inner Pages
import Login1 from "../Pages/AuthenticationPages/Login";
// import Register1 from "../Pages/AuthenticationPages/Register";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
import LockScreen from "../Pages/AuthenticationPages/LockScreen";

// Import Utility Pages
import StarterPage from "../Pages/Utility/Starter-Page";
import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
// import TimeLine from "../Pages/Utility/TimeLine-Page";
import FAQs from "../Pages/Utility/FAQs-Page";
import Pricing from "../Pages/Utility/Pricing-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";

// Import Icon Pages
import IconMaterialdesign from "../Pages/Icons/IconMaterialdesign";
import IconFontawesome from "../Pages/Icons/IconFontAwesome";
import IconDripicons from "../Pages/Icons/IconDrip";
import IconBoxicons from "../Pages/Icons/IconBoxicons"

// Import Map Pages
// import VectorMaps from "../Pages/Maps/VectorMap";
// import GoogleMap from "../Pages/Maps/GoogleMap";
import ClientManagement from "../Pages/ClientsManagement/index.js";
import ProfileSettings from "../Pages/Settings/ProfileSettings.jsx";
import FirmsSetting from "../Pages/Firms/FirmsSetting.js";
import CreateFirm from "../Pages/Firms/CreateFirm.js";
import SwitchFirm from "../Pages/Firms/SwitchFirm.js";
import CreatePlan from "../Pages/Plans/CreatePlan.js";
import ManagePlan from "../Pages/Plans/ManagePlan.js";
import UserManage from "../Pages/Firms/UserManage.jsx";
import VerifyOtp from "../Pages/AuthenticationPages/VerifyOtp.jsx";
import ClientsPayments from "../Pages/ClientsManagement/clientPayments.js";
import ViewCustomer from "../Pages/Invoicing/viewCustomer.jsx";


const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/clients-management", component: <ClientManagement /> },
  { path: "/clients-payments", component: <ClientsPayments /> },

  // plans
  { path: "/create-plan", component: <CreatePlan /> },
  { path: "/manage-plan", component: <ManagePlan /> },

  // invoicing
  { path: "/create-invoice", component: <CreateInvoice/> },
  { path: "/view-invoices", component: <ViewInvoice /> },
  { path: "/payments-invoice", component: < PaymentsInvoice /> },
  { path: "/reports-invoice", component: < ReportsInvoice /> },
  { path: "/view-customers", component: <ViewCustomer />},

  // Inventory MNG
  {path:"/inventory-table", component: <InventoryTable />},
  {path:"/add-inventory", component: <TableForm />},
  {path:"/table-taxation", component: <TableTaxation />},
  {path:"/item-configuration", component: <ItemConfiguration />},
  {path:"/manage-category", component: <CategoryManager />},
  // firm
  {path:"/firms", component: <Firm />},
  {path:"/firmusers", component: <UserManage />},
  {path:"/firms-setting", component: <FirmsSetting />},
  {path:"/create-firm", component: <CreateFirm />},
  {path:"/switch-firm", component: <SwitchFirm/>},

  //  Coming Soon 
  {path:"/clients-portal" , component: <ComingSoon />},
  {path:"/clients-payments" , component: <ComingSoon />},
  {path:"/clients/invoices" , component: <ComingSoon />},
  {path:"/clients/statements" , component: <ComingSoon />},
  {path:"/vendors/manage" , component: <ComingSoon />},
  {path:"/vendors/payments" , component: <ComingSoon />},
  {path:"/vendors/invoices" , component: <ComingSoon />},
  {path:"/vendors/info" , component: <ComingSoon />},
  {path:"/vendors/statements" , component: <ComingSoon />},
  {path:"/invoices/recurring" , component: <ComingSoon />},
  {path:"/invoices/payment-tracking" , component: <ComingSoon />},
  {path:"/invoices/bulk-generation" , component: <ComingSoon />},
  {path:"/invoices/templates" , component: <ComingSoon />},
  {path:"/quotes/create" , component: <ComingSoon />},
  {path:"/quotes/manage" , component: <ComingSoon />},
  {path:"/support/help-desk" , component: <ComingSoon />},
  {path:"/support/knowledge-base" , component: <ComingSoon />},
  {path:"/support/live-chat" , component: <ComingSoon />},
  {path:"/support/submit-ticket" , component: <ComingSoon />},
  {path:"/preferences/general" , component: <ComingSoon />},
  {path:"/preferences/company" , component: <ComingSoon />},
  {path:"/preferences/security" , component: <ComingSoon />},
  {path:"/preferences/notifications" , component: <ComingSoon />},
  {path:"/preferences/integrations" , component: <ComingSoon />},
  {path:"/preferences/tax" , component: <ComingSoon />},
  {path:"/preferences/country-laws" , component: <ComingSoon />},
  {path:"/reports/aged-receivables-payables" , component: <ComingSoon />},
  {path:"/reports/standard" , component: <ComingSoon />},
  {path:"/reports/custom" , component: <ComingSoon />},
  {path:"/reports/export" , component: <ComingSoon />},
  {path:"/reports/budgeting" , component: <ComingSoon />},
  {path:"/payments/received" , component: <ComingSoon />},
  {path:"/payments/made" , component: <ComingSoon />},
  {path:"/payments/manage" , component: <ComingSoon />},
  {path:"/payments/reconciliation" , component: <ComingSoon />},
  {path:"/expenses/record" , component: <ComingSoon />},
  {path:"/expenses/manage" , component: <ComingSoon />},
  {path:"/expenses/categories" , component: <ComingSoon />},
  {path:"/expenses/upload-receipt" , component: <ComingSoon />},
  {path:"/expenses/approval-workflow" , component: <ComingSoon />},
  {path:"/purchase-orders/create" , component: <ComingSoon />},
  {path:"/purchase-orders/manage" , component: <ComingSoon />},
  {path:"/purchase-bills/record" , component: <ComingSoon />},
  {path:"/purchase-bills/manage" , component: <ComingSoon />},
  {path:"/purchase-bills/payments" , component: <ComingSoon />},
  {path:"/purchase-bills/link-orders" , component: <ComingSoon />},
  {path:"/credit-notes/create" , component: <ComingSoon />},
  {path:"/credit-notes/manage" , component: <ComingSoon />},
  {path:"/credit-notes/apply" , component: <ComingSoon />},
  {path:"/debit-notes/create" , component: <ComingSoon />},
  {path:"/debit-notes/manage" , component: <ComingSoon />},
  {path:"/debit-notes/apply" , component: <ComingSoon />},
  {path:"/delivery-challans/create" , component: <ComingSoon />},
  {path:"/delivery-challans/manage" , component: <ComingSoon />},
  {path:"/delivery-challans/track" , component: <ComingSoon />},
  // {path:"" , component: <ComingSoon />},
  // {path:"" , component: <ComingSoon />},
  // {path:"" , component: <ComingSoon />},
  // {path:"" , component: <ComingSoon />},
  // {path:"" , component: <ComingSoon />},

  // Profile
  // { path: "/userprofile", component: <UserProfile /> },

  //Settings
  {path:"/profile-settings", component: <ProfileSettings />}, 

 

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  // { path: "/pages-timeline", component: <TimeLine /> },
  { path: "/pages-faqs", component: <FAQs /> },
  { path: "/pricing", component: <Pricing /> },


  // Icons Pages
  { path: "/icon-boxicon", component: <IconBoxicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icon-dripicons", component: <IconDripicons /> },

  // Maps Pages
  // { path: "/maps-vector", component: <VectorMaps /> },
  // { path: "/maps-google", component: <GoogleMap /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login1 /> },
  { path: "/forgot-password", component: <RecoverPassword /> },
  { path: "/recover-password", component: <RecoverPassword /> },
  { path: "/register", component: <Register /> },
  {path:"/reset-password/:token", component: <ResetPassword />},
  {path:"/reset-password", component: <Navigate to ="/login" />},
  {path:"/verify-email", component: <VerifyOtp/>},

  // // Authentication Inner Pages
  // { path: "/auth-login", component: <Login1 /> },
  // { path: "/auth-register", component: <Register /> },
  // { path: "/recover-password", component: <RecoverPassword /> },
  { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/*", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },
];

export { authProtectedRoutes, publicRoutes };
