import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Link } from "react-router-dom";
UserContext;

function Header() {
  const { user } = useContext(UserContext);
  return (
    <header>
      <ul>
        <li>
          <h1>NC News</h1>
        </li>
        <li>
          <img src="../../user-icon.png" alt="" />
          <Link to={user ? `/users/${user}` : "/sign-in"}>
            <strong>{user ? user : "Sign In"}</strong>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
