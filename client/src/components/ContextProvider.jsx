import PropTypes from "prop-types";
import { createContext, useState } from "react";
const authContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const value = {
    user, // { username : "username", userId: "userId", email : "email", token : "token"}
    setUser,
    showAuthModal,
    setShowAuthModal,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextProvider, authContext };
