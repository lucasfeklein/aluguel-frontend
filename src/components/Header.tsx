import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-around">
      <p>logo</p>
      <Link to="/login">
        <button className="bg-blue-400 text-white rounded-md px-4 py-2">
          Login
        </button>
      </Link>
    </div>
  );
}

export default Header;
