import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import { fetchUserData } from "../api";
import user_icon from "../assets/user-icon.png";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(undefined);
  useEffect(() => {
    fetchUserData(user).then((foundUser) => {
      setUserData(foundUser);
    });
  }, [user]);

  function handleSignOut() {
    setUser("");
  }

  return (
    <header>
      <ul>
        <li>
          <h1>NC News</h1>
        </li>
        <li>
          <img src={userData ? userData.avatar_url : user_icon} />
          <Link to={user ? `/users/${user}` : "/sign-in"}>
            <strong>{user ? user : "Sign In"}</strong>
          </Link>
          {user ? (
            <p className="sign-out-text">
              not {user}?
              <Link onClick={handleSignOut} className="sign-out-text">
                sign-out
              </Link>
            </p>
          ) : null}
        </li>
      </ul>
    </header>
  );
}

export default Header;
