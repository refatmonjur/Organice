import React from "react";
import { Redirect } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { useHistory } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  //   const user = false;
  let history = useHistory();
  console.log("Check user in Private: ", user);
  if (!user) {
    return <Redirect to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
