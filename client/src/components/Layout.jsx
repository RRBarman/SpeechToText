import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useContext } from "react";
import { authContext } from "./ContextProvider.jsx";
import { createPortal } from "react-dom";
import AuthModel from "./AuthModel.jsx";
const Layout = () => {
  const { setUser, showAuthModal, setShowAuthModal } = useContext(authContext);
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }
  return (
    <div className="main_layout">
      <Header />
      <Outlet />
      {showAuthModal &&
        createPortal(
          <AuthModel setShowAuthModal={setShowAuthModal} />,
          document.getElementById("portal")
        )}
      <Footer />
    </div>
  );
};
export default Layout;
