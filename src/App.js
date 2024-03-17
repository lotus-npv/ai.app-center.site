import PropTypes from 'prop-types';
import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Routes, Route } from "react-router-dom";
import { layoutTypes } from "./constants/layout";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";

// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-light-purple/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'
// import 'primereact/resources/themes/bootstrap4-dark-purple/theme.css'
// import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/themes/md-light-deeppurple/theme.css'
//import 'primereact/resources/themes/md-dark-indigo/theme.css'
//import 'primereact/resources/themes/md-dark-deeppurple/theme.css'
//import 'primereact/resources/themes/mdc-light-indigo/theme.css'
//import 'primereact/resources/themes/mdc-light-deeppurple/theme.css'
//import 'primereact/resources/themes/mdc-dark-indigo/theme.css'
//import 'primereact/resources/themes/mdc-dark-deeppurple/theme.css'
//import 'primereact/resources/themes/tailwind-light/theme.css'
//import 'primereact/resources/themes/fluent-light/theme.css'
//import 'primereact/resources/themes/lara-light-blue/theme.css'
//import 'primereact/resources/themes/lara-light-indigo/theme.css'
//import 'primereact/resources/themes/lara-light-purple/theme.css'
//import 'primereact/resources/themes/lara-light-teal/theme.css'
//import 'primereact/resources/themes/lara-dark-blue/theme.css'
//import 'primereact/resources/themes/lara-dark-indigo/theme.css'
//import 'primereact/resources/themes/lara-dark-purple/theme.css'
//import 'primereact/resources/themes/lara-dark-teal/theme.css'
//import 'primereact/resources/themes/soho-light/theme.css'
//import 'primereact/resources/themes/soho-dark/theme.css'
//import 'primereact/resources/themes/viva-light/theme.css'
//import 'primereact/resources/themes/viva-dark/theme.css'
//import 'primereact/resources/themes/mira/theme.css'
//import 'primereact/resources/themes/nano/theme.css'
//import 'primereact/resources/themes/saga-blue/theme.css'
//import 'primereact/resources/themes/saga-green/theme.css'
//import 'primereact/resources/themes/saga-orange/theme.css'
//import 'primereact/resources/themes/saga-purple/theme.css'
//import 'primereact/resources/themes/vela-blue/theme.css'
//import 'primereact/resources/themes/vela-green/theme.css'
//import 'primereact/resources/themes/vela-orange/theme.css'
//import 'primereact/resources/themes/vela-purple/theme.css'
//import 'primereact/resources/themes/arya-blue/theme.css'
//import 'primereact/resources/themes/arya-green/theme.css'
//import 'primereact/resources/themes/arya-orange/theme.css'
//import 'primereact/resources/themes/arya-purple/theme.css'

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);


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

const App = () => {


  const selectLayoutState = (state) => state.Layout;
  const LayoutProperties = createSelector(
    selectLayoutState,
      (layout) => ({
        layoutType: layout.layoutType,
      })
  );

    const {
      layoutType
  } = useSelector(LayoutProperties);

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      <Routes>
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

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;