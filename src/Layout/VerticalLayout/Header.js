import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LanguageDropdown from "../../components/Common/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../../components/Common/TopbarDropdown/NotificationDropdown";

//i18n
import { withTranslation } from "react-i18next";

//import images
import logoSm from "../../assets/images/logo-sm-svg.svg";
import logoDark from "../../assets/images/logo-dark-svg.svg";
import logoLight from "../../assets/images/logo-light.png";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeTopbarTheme,
} from "../../store/actions";
import ProfileMenu from "../../components/Common/TopbarDropdown/ProfileMenu";
// import AppsDropdown from "../../components/Common/TopbarDropdown/AppsDropdown";

// import redux reducers from layout 
import {
  // layoutTypes,
  // layoutWidthTypes,
  topBarThemeTypes,
  // leftSidebarTypes,
  leftSideBarThemeTypes,
  layoutModeTypes,
} from "../../constants/layout";

const Header = (props) => {
  // const [search, setsearch] = useState(false);.

  // function for toggle the theme of application
  const handleThemeToggle = (mode) => {
    // Determine which action to dispatch based on the mode
    switch (mode) {
      case 'light':
        props.changeLayoutMode(layoutModeTypes.LIGHTMODE);
        props.changeTopbarTheme(topBarThemeTypes.LIGHT);
        props.changeSidebarTheme(leftSideBarThemeTypes.LIGHT);
        break;
      case 'dark':
        props.changeLayoutMode(layoutModeTypes.DARKMODE);
        props.changeTopbarTheme(topBarThemeTypes.DARK);
        props.changeSidebarTheme(leftSideBarThemeTypes.DARK);
        break;
      default:
        break;
    }
  };

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-dark" height={60} width={60} />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="logo-dark"  height={60} width={228} />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoSm} alt="logo-sm-light" height={60} width={60} />
                </span>
                <span className="logo-lg">
                  <img src={logoDark} alt="logo-light" height={60} width={228} />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={() => {
                tToggle();
              }}
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>

            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
                <span className="ri-search-line"></span>
              </div>
            </form> */}
          </div>
          <div className="d-flex w-50 align-item-center">
            <ul className="top-navbar-links" id="nav-links">
              <li><Link to="/create-firm">Create Firm</Link></li>
              <li><Link to="/pricing">Pricing & plan</Link></li>
              <li><Link to="/view-invoices">invoices</Link></li>
            </ul>
          </div>
          <div className="d-flex">
            {/* <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="ri-search-line" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="ri-search-line" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}

            <LanguageDropdown />
            <button
              type="button"
              className="btn header-item noti-icon right-bar-toggle waves-effect"
              onClick={() => {
                const currentMode = props.layoutModeTypes === layoutModeTypes.LIGHTMODE ? 'dark' : 'light';
                handleThemeToggle(currentMode);
              }}
            >
              {props.layoutModeTypes === layoutModeTypes.LIGHTMODE ? (
              <i className="mdi mdi-brightness-4"></i>
              ) : (
                <i className="mdi mdi-white-balance-sunny"></i>
              )}
            </button>
            {/* <div
              className="dropdown d-inline-block"
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
            <i className="mdi mdi-white-balance-sunny"></i>
              </button>
            </div> */}
            {/* <AppsDropdown /> */}

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon"
                data-toggle="fullscreen"
              >
                <i className="ri-fullscreen-line" />
              </button>
            </div>

            <NotificationDropdown />

            <ProfileMenu />

            
          
            <div
              className="dropdown d-inline-block"
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
            >
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="mdi mdi-cog"></i>
              </button>
            </div>

            {/* Button for toggling the theme */}
           
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType,layoutModeTypes } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType,layoutModeTypes };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
  changeLayout,
  changeLayoutMode,
  changeSidebarTheme,
  changeTopbarTheme
})(withTranslation()(Header));
