import React, { useCallback, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "../../components/Common/withRouter";
import { withTranslation } from "react-i18next";
import { userRolesSidebarData } from "./SidebarData";

const Sidebar = (props) => {
  const ref = useRef();
  const metisMenuRef = useRef();

  const role = JSON.parse(localStorage.getItem('authUser'))?.response?.role;
  const sidebarItems = userRolesSidebarData(role);

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    let parent = item.parentElement;

    while (parent) {
      if (parent.tagName === 'li') {
        parent.classList.add("mm-active");
        parent = parent.parentElement;
      } else if (parent.tagName === 'ul') {
        parent.classList.add("mm-show");
        parent = parent.parentElement;
      } else {
        break;
      }
    }
    scrollElement(item);
  }, []);

  const removeActivation = (items) => {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classList.remove("active");
      let parent = item.parentElement;
      while (parent) {
        if (parent.tagName === 'li') {
          parent.classList.remove("mm-active");
          parent = parent.parentElement;
        } else if (parent.tagName === 'ul') {
          parent.classList.remove("mm-show");
          parent = parent.parentElement;
        } else {
          break;
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = props.router.location.pathname;
    const ul = metisMenuRef.current;
    if (ul) {
      const items = ul.getElementsByTagName("a");
      removeActivation(items);
      for (let i = 0; i < items.length; i++) {
        if (pathName === items[i].pathname) {
          activateParentDropdown(items[i]);
          break;
        }
      }
    }
  }, [props.router.location.pathname, activateParentDropdown]);

  useEffect(() => {
    const metisMenu = new MetisMenu(metisMenuRef.current);
    activeMenu();
    return () => metisMenu.dispose();
  }, [activeMenu]);

  // useEffect(() => {
  //   // Recalculate SimpleBar on route change
  //   ref.current.recalculate();
  // }, [props.router.location.pathname]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <SimpleBar className="h-100" ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" ref={metisMenuRef}>
              {sidebarItems.map((item, key) => (
                <React.Fragment key={key}>
                  {item.isMainMenu ? (
                    <li className="menu-title">{props.t(item.label)}</li>
                  ) : (
                    <li>
                      <Link
                        to={item.url || "/#"}
                        className={item.subItem ? "has-arrow" : ""}
                      >
                        <i
                          className={item.icon}
                          style={{ marginRight: "10px" }}
                        ></i>
                        {item.subItem && (
                          <span
                            className={
                              "badge rounded-pill float-end " + item.bgcolor
                            }
                          >
                            {item.badgeValue}
                          </span>
                        )}
                        <span>{props.t(item.label)}</span>
                      </Link>
                      {item.subItem && (
                        <ul className="sub-menu">
                          {item.subItem.map((subItem, key) => (
                            <li key={key}>
                              <Link
                                to={subItem.link}
                                className={
                                  subItem.subMenu ? "has-arrow waves-effect" : ""
                                }
                              >
                                {props.t(subItem.sublabel)}
                              </Link>
                              {subItem.subMenu && (
                                <ul className="sub-menu">
                                  {subItem.subMenu.map((subSubItem, key) => (
                                    <li key={key}>
                                      <Link to={subSubItem.link || "#"}>
                                        {props.t(subSubItem.title)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
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
