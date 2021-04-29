import React from "react";

export const UserContext = React.createContext({
  UserToken: null,
  loginUser: () => {},
  logoutUser: () => {},
});
