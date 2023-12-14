import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
import { fetchUserData } from "../api";

function Header() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchUserData(user).then((user) => {
      setUserData(user);
    });
  });

  return (
    <header>
      <ul>
        <li>
          <h1>NC News</h1>
        </li>
        <li>
          <img src={userData.avatar_url} alt="user avatar image" />
          <Link to={user ? `/users/${user}` : "/sign-in"}>
            <strong>{user ? user : "Sign In"}</strong>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
