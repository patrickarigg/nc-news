import { Link } from "react-router-dom";

function Error({ title, msg }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{msg}</p>
      <Link to={-1}>Go back</Link>
    </>
  );
}

export default Error;
