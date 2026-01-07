import React from "react";

export const PrivateRoute = ({ role = "", roles = [], children }) => {
  const result = roles.find((fd) => fd === role);
  return result ? children : <></>;
};
