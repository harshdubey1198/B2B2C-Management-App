// import React, { useCallback, useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import SimpleBar from "simplebar-react";
// import MetisMenu from "metismenujs";
// import withRouter from "../../components/Common/withRouter";
// import { withTranslation } from "react-i18next";
// import { userRolesSidebarData } from "./SidebarData";
// import { getSidebarByRole } from "../../apiServices/service";

// const Sidebar = (props) => {
//   const ref = useRef();
//   const metisMenuRef = useRef();

//   const role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;
//   const sidebarItems = userRolesSidebarData(role);

//   const activateParentDropdown = useCallback((item) => {
//     item.classList.add("active");
//     let parent = item.parentElement;

//     while (parent) {
//       if (parent.tagName === 'li') {
//         parent.classList.add("mm-active");
//         parent = parent.parentElement;
//       } else if (parent.tagName === 'ul') {
//         parent.classList.add("mm-show");
//         parent = parent.parentElement;
//       } else {
//         break;
//       }
//     }
//     scrollElement(item);
//   }, []);

//   const removeActivation = (items) => {
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       item.classList.remove("active");
//       let parent = item.parentElement;
//       while (parent) {
//         if (parent.tagName === 'li') {
//           parent.classList.remove("mm-active");
//           parent = parent.parentElement;
//         } else if (parent.tagName === 'ul') {
//           parent.classList.remove("mm-show");
//           parent = parent.parentElement;
//         } else {
//           break;
//         }
//       }
//     }
//   };

//   const activeMenu = useCallback(() => {
//     const pathName = props.router.location.pathname;
//     const ul = metisMenuRef.current;
//     if (ul) {
//       const items = ul.getElementsByTagName("a");
//       removeActivation(items);
//       for (let i = 0; i < items.length; i++) {
//         if (pathName === items[i].pathname) {
//           activateParentDropdown(items[i]);
//           break;
//         }
//       }
//     }
//   }, [props.router.location.pathname, activateParentDropdown]);

//   useEffect(() => {
//     const metisMenu = new MetisMenu(metisMenuRef.current);
//     activeMenu();
//     return () => metisMenu.dispose();
//   }, [activeMenu]);

//   // useEffect(() => {
//   //   // Recalculate SimpleBar on route change
//   //   ref.current.recalculate();
//   // }, [props.router.location.pathname]);

//   function scrollElement(item) {
//     if (item) {
//       const currentPosition = item.offsetTop;
//       if (currentPosition > window.innerHeight) {
//         ref.current.getScrollElement().scrollTop = currentPosition - 300;
//       }
//     }
//   }

//   const [apiSidebars, setApiSidebars] = useState([]);
//   const fetchSidebar = async () => {
//     try {
//       const response = await getSidebarByRole(role);
//       setApiSidebars(response.data);
//     }
//     catch (error) {console.error("Error fetching sidebar:", error);}
//   }
//   useEffect(() => {
//     fetchSidebar();
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="vertical-menu">
//         <SimpleBar className="h-100" ref={ref}>
//           <div id="sidebar-menu">
//             <ul className="metismenu list-unstyled" ref={metisMenuRef}>
//               {sidebarItems.map((item, key) => (
//                 <React.Fragment key={key}>
//                   {item.isMainMenu ? (
//                     <li className="menu-title">{props.t(item.label)}</li>
//                   ) : (
//                     <li>
//                       <Link
//                         to={item.url || "/#"}
//                         className={item.subItem ? "has-arrow" : ""}
//                       >
//                         <i
//                           className={item.icon}
//                           style={{ marginRight: "10px" }}
//                         ></i>
//                         {item.subItem && (
//                           <span
//                             className={
//                               "badge rounded-pill float-end " + item.bgcolor
//                             }
//                           >
//                             {item.badgeValue}
//                           </span>
//                         )}
//                         <span>{props.t(item.label)}</span>
//                       </Link>
//                       {item.subItem && (
//                         <ul className="sub-menu">
//                           {item.subItem.map((subItem, key) => (
//                             <li key={key}>
//                               <Link
//                                 to={subItem.link}
//                                 className={
//                                   subItem.subMenu ? "has-arrow waves-effect" : ""
//                                 }
//                               >
//                                 {props.t(subItem.sublabel)}
//                               </Link>
//                               {subItem.subMenu && (
//                                 <ul className="sub-menu">
//                                   {subItem.subMenu.map((subSubItem, key) => (
//                                     <li key={key}>
//                                       <Link to={subSubItem.link || "#"}>
//                                         {props.t(subSubItem.title)}
//                                       </Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   )}
//                 </React.Fragment>
//               ))}
//             </ul>
//           </div>
//         </SimpleBar>
//       </div>
//     </React.Fragment>
//   );
// };

// Sidebar.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.func,
// };

// export default withRouter(withTranslation()(Sidebar));

// part two render by api
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import SimpleBar from "simplebar-react";
// import MetisMenu from "metismenujs";
// import withRouter from "../../components/Common/withRouter";
// import { withTranslation } from "react-i18next";
// import { getSidebarByRole } from "../../apiServices/service";

// const Sidebar = (props) => {
//   const ref = useRef();
//   const metisMenuRef = useRef();

//   const role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;

//   const [sidebarItems, setSidebarItems] = useState([]);

//   const fetchSidebar = async () => {
//     try {
//       const response = await getSidebarByRole(role);
//       if (response && response.response && response.response.sidebar) {
//         setSidebarItems(response.response.sidebar);
//       }
//     } catch (error) {
//       console.error("Error fetching sidebar:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSidebar();
//   }, []);

//   const activateParentDropdown = useCallback((item) => {
//     item.classList.add("active");
//     let parent = item.parentElement;

//     while (parent) {
//       if (parent.tagName === 'LI') {
//         parent.classList.add("mm-active");
//         parent = parent.parentElement;
//       } else if (parent.tagName === 'UL') {
//         parent.classList.add("mm-show");
//         parent = parent.parentElement;
//       } else {
//         break;
//       }
//     }
//     scrollElement(item);
//   }, []);

//   const removeActivation = (items) => {
//     for (let i = 0; i < items.length; i++) {
//       const item = items[i];
//       item.classList.remove("active");
//       let parent = item.parentElement;
//       while (parent) {
//         if (parent.tagName === 'LI') {
//           parent.classList.remove("mm-active");
//           parent = parent.parentElement;
//         } else if (parent.tagName === 'UL') {
//           parent.classList.remove("mm-show");
//           parent = parent.parentElement;
//         } else {
//           break;
//         }
//       }
//     }
//   };

//   const activeMenu = useCallback(() => {
//     const pathName = props.router.location.pathname;
//     const ul = metisMenuRef.current;
//     if (ul) {
//       const items = ul.getElementsByTagName("a");
//       removeActivation(items);
//       for (let i = 0; i < items.length; i++) {
//         if (pathName === items[i].pathname) {
//           activateParentDropdown(items[i]);
//           break;
//         }
//       }
//     }
//   }, [props.router.location.pathname, activateParentDropdown]);

//   useEffect(() => {
//     const metisMenu = new MetisMenu(metisMenuRef.current);
//     activeMenu();
//     return () => metisMenu.dispose();
//   }, [activeMenu]);

//   function scrollElement(item) {
//     if (item) {
//       const currentPosition = item.offsetTop;
//       if (currentPosition > window.innerHeight) {
//         ref.current.getScrollElement().scrollTop = currentPosition - 300;
//       }
//     }
//   }

//   return (
//     <React.Fragment>
//       <div className="vertical-menu">
//         <SimpleBar className="h-100" ref={ref}>
//           <div id="sidebar-menu">
//             <ul className="metismenu list-unstyled" ref={metisMenuRef}>
//               {sidebarItems.map((item, key) => (
//                 <React.Fragment key={key}>
//                   {item.isMainMenu ? (
//                     <li className="menu-title">{props.t(item.label)}</li>
//                   ) : (
//                     <li>
//                       <Link
//                         to={item.url || "/#"}
//                         className={item.subItem.length ? "has-arrow" : ""}
//                       >
//                         <i className={item.icon} style={{ marginRight: "10px" }}></i>
//                         {item.subItem.length > 0 && (
//                           <span className={"badge rounded-pill float-end " + item.bgcolor}>
//                             {item.badgeValue}
//                           </span>
//                         )}
//                         <span>{props.t(item.label)}</span>
//                       </Link>
//                       {item.subItem.length > 0 && (
//                         <ul className="sub-menu">
//                           {item.subItem.map((subItem, subKey) => (
//                             <li key={subKey}>
//                               <Link to={subItem.link} className={subItem.subMenu ? "has-arrow waves-effect" : ""}>
//                                 {props.t(subItem.sublabel)}
//                               </Link>
//                               {subItem.subMenu && (
//                                 <ul className="sub-menu">
//                                   {subItem.subMenu.map((subSubItem, subSubKey) => (
//                                     <li key={subSubKey}>
//                                       <Link to={subSubItem.link || "#"}>
//                                         {props.t(subSubItem.title)}
//                                       </Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   )}
//                 </React.Fragment>
//               ))}
//             </ul>
//           </div>
//         </SimpleBar>
//       </div>
//     </React.Fragment>
//   );
// };

// Sidebar.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.func,
// };

// export default withRouter(withTranslation()(Sidebar));


// part three render and functioning without css
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "../../components/Common/withRouter";
import { withTranslation } from "react-i18next";
import { getSidebarByRole } from "../../apiServices/service";

const Sidebar = (props) => {
  const ref = useRef();
  const metisMenuRef = useRef();
  const location = useLocation();

  const role = JSON.parse(localStorage.getItem("authUser"))?.response?.role;
  const [sidebarItems, setSidebarItems] = useState([]);
  const [openMenus, setOpenMenus] = useState({});

  // Fetch sidebar data
  const fetchSidebar = async () => {
    try {
      const response = await getSidebarByRole(role);
      if (response?.response?.sidebar) {
        setSidebarItems(response.response.sidebar);
      }
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };

  useEffect(() => {
    fetchSidebar();
  }, []);

  // Initialize MetisMenu
  useEffect(() => {
    if (metisMenuRef.current) {
      new MetisMenu(metisMenuRef.current);
    }
  }, []);

  // Handle menu toggle
  const toggleMenu = (index) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle menu state
    }));
  };

  // Auto-expand the active menu
  useEffect(() => {
    const activeMenus = {};
    sidebarItems.forEach((item, index) => {
      if (item.subItem?.some((sub) => sub.link === location.pathname)) {
        activeMenus[index] = true; // Keep menu open if child is active
      }
    });
    setOpenMenus(activeMenus);
  }, [sidebarItems, location.pathname]);

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <SimpleBar className="h-100" ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" ref={metisMenuRef}>
              {sidebarItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.isMainMenu ? (
                    <li className="menu-title">{props.t(item.label)}</li>
                  ) : (
                  <li className={openMenus[index] ? "mm-active mm-show" : ""}>
                    {item.subItem.length > 0 ? (
                       <a
                       href="#"
                       onClick={(e) => {
                         e.preventDefault(); 
                         toggleMenu(index);
                       }}
                       className={item.subItem.length > 0 ? "has-arrow" : ""}
                       style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "start" }}
                     >
                     
                          <i className={item.icon} style={{ marginRight: "10px" }}></i>
                          <span >{props.t(item.label)}</span>
                        </a>
                      ) : (
                        <Link to={item.url}>
                          <i className={item.icon} style={{ marginRight: "10px" }}></i>
                          <span>{props.t(item.label)}</span>
                        </Link>
                      )}

                      {item.subItem.length > 0 && (
                        <ul className="sub-menu" style={{ display: openMenus[index] ? "block" : "none" }}>
                          {item.subItem.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link to={subItem.link}>
                                {props.t(subItem.sublabel)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </SimpleBar>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  location: PropTypes.object,
  t: PropTypes.func,
};

export default withRouter(withTranslation()(Sidebar));
