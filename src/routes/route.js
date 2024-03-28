import React from "react";
import { Navigate } from "react-router-dom";

// const Authmiddleware = (props) => {

//   console.log('props:', props.path)
//   if (!localStorage.getItem("authUser")) {
//     return (
//       <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
//     );
//   }
//   return (<React.Fragment>
//     {props.children}
//   </React.Fragment>);
// };

const Loginmiddleware = (props) => {
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  return (<React.Fragment>
    {props.children}
  </React.Fragment>);
};

const RoleBasedMiddleware = (props) => {
  // const userRole = localStorage.getItem("userRole");
  const userRole = JSON.parse(localStorage.getItem("authUser"))[0];

  // console.log('prosp:', props)
  // console.log('role:', userRole.user_type)
  if (userRole.user_type === 'intern' && props.pathname === '/dashboard') {
    console.log('check:');
    // return <Navigate to="/pages-404" />;
    <Navigate to={{ pathname: "/pages-404", state: { from: props.location } }} />
  } else {
    <Navigate to={{ pathname: "/ticket", state: { from: props.location } }} />
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

const Authmiddleware = (props) => {
  return (
    <Loginmiddleware {...props}>
      <RoleBasedMiddleware {...props} />
    </Loginmiddleware>
  );
};

export default Authmiddleware;
