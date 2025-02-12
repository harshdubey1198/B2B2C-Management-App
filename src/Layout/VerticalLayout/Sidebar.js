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
  const [updateTrigger, setUpdateTrigger] = useState(0); 
  const role = JSON.parse(localStorage.getItem("authUser"))?.response?.role;
  const [sidebarItems, setSidebarItems] = useState([]);
  const [openMenus, setOpenMenus] = useState({});
  const fetchSidebar = async () => {
    try {
      const response = await getSidebarByRole(role);
      if (response?.response?.sidebar) {
        const filteredSidebar = response.response.sidebar
          .filter(item => !item.deleted , item => !item.deleted==true)          .map(item => ({
            ...item,
            subItem: item.subItem
              ? item.subItem.filter(sub => !sub.deleted , sub => !sub.deleted==true)
              : [],
          }));
  
        setSidebarItems(filteredSidebar);
        console.log("Sidebar Items:", filteredSidebar);
      }
    } catch (error) {
      console.error("Error fetching sidebar:", error);
    }
  };
  
  useEffect(() => {
    fetchSidebar();
  }, []);

  useEffect(() => {
    fetchSidebar();
  }, [updateTrigger]); 

  useEffect(() => {
    const handleSidebarUpdate = (event) => {
      const { role: updatedRole } = event.detail;
      if (role === updatedRole) {
        console.log(`Sidebar update triggered for role: ${updatedRole}`);
        setUpdateTrigger((prev) => prev + 1); 
        setTimeout(() => {
          setUpdateTrigger((prev) => prev + 1);
        }, 500);
      }
    };

    window.addEventListener("sidebarUpdatedForRole", handleSidebarUpdate);
    return () => {
      window.removeEventListener("sidebarUpdatedForRole", handleSidebarUpdate);
    };
  }, [role]);

  useEffect(() => {
    if (metisMenuRef.current) {
      new MetisMenu(metisMenuRef.current);
    }
  }, []);

  const toggleMenu = (index) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };

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
