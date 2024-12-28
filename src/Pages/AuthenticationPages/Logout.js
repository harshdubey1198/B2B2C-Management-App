import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

import { logoutUser } from "../../store/actions";

// redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { getRole } from "../../utils/roleUtils";

const mainUsers = ['super_admin', 'client_admin', 'firm_admin', 'accountant', 'employee'];
const crmUsers = ['ASM', 'Telecaller', 'SM'];

const Logout = () => {
  const dispatch = useDispatch();
  const role = getRole(); 
  console.log(role);
  const logoutpage = createSelector(
    (state) => state.login,
    (state) => ({
      isUserLogout: state.isUserLogout,
    })
  );

  const { isUserLogout } = useSelector(logoutpage);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    if (crmUsers.includes(role)) {
      return <Navigate to="/crm/login" />;
    } else if (mainUsers.includes(role)) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return null;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
