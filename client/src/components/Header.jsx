import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "./ContextProvider.jsx";
const Header = () => {
  const { user, setShowAuthModal, setUser } = useContext(authContext);

  async function handleLoginSignup() {
    setShowAuthModal(true);
  }
  async function handleLougout() {
    setUser(null);
    window.localStorage.removeItem("user");
  }
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/userTasks">User Tasks</Link>
      <div className="profile">
        {user ? (
          <>
            <p>{user.username}</p>
            <button onClick={handleLougout}>Logout</button>
          </>
        ) : (
          <button onClick={handleLoginSignup}>Login/Sign up</button>
        )}
      </div>
    </div>
  );
};

export default Header;
