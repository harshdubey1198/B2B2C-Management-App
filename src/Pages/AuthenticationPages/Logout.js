import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

import { logoutUser } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { createSelector } from 'reselect';

const Logout = () => {
  const dispatch = useDispatch();

  const logoutpage = createSelector(
    (state ) => state.login,
    (state) => ({
        isUserLogout: state.isUserLogout,
    })
  );
// Inside your component
const { isUserLogout } = useSelector(logoutpage);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);