import React from "react";
import { Routes, Route } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

//constants
import { layoutTypes } from "../constants/layout";

// layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import HorizontalLayout from "../Layout/HorizontalLayout/index";
import { AuthProtected } from "./AuthProtected";

import { authProtectedRoutes, publicRoutes } from "./routes";

import { createSelector } from 'reselect';

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const Index = () => {

  const routepage = createSelector(
    (state ) => state.Layout,
    (state) => ({
        layoutType: state.layoutType,
    })
  );
// Inside your component
const { layoutType } = useSelector(routepage);

  const Layout = getLayout(layoutType);

  return (
    <Routes>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                  {route.component}
              </NonAuthLayout>
          }
            key={idx}
            exact={true}
          />
        ))}
      </Route>

      <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AuthProtected>
                    <Layout>{route.component}</Layout>
                </AuthProtected>}
              key={idx}
              exact={true}
            />
          ))}
      </Route>
    </Routes>
  );
};

export default Index;
