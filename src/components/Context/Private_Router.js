import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const PrivateRouter = ({ children,  ...props }) => {
  const { user } = useContext(UserContext);


if (!user) {
  
  return <Navigate to="/login" />;
}


return children;
};
export default PrivateRouter;