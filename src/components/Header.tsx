import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import { useAuth } from "./AuthContext";

function Header() {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { person, setPerson } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (token) {
        try {
          const response = await api.get("/person/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            // Check if the response status is OK
            setPerson(response.data); // Set the person state with the response data
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPerson(undefined);
    navigate("/");
  };

  return (
    <div className="flex justify-around items-center">
      <Link to="/">
        <p>logo</p>
      </Link>
      {person?.name ? (
        <div className="flex gap-4 items-center">
          <div className="relative">
            <button onClick={() => setToggleDropdown((prev) => !prev)}>
              {person.name}
            </button>

            {toggleDropdown && (
              <div className="absolute bg-gray-200 w-[70px]">
                <Link to="/myrentals">
                  <button onClick={() => setToggleDropdown(false)}>
                    My rents
                  </button>
                </Link>
              </div>
            )}
          </div>
          <button
            className="bg-blue-400 text-white rounded-md px-4 py-2"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-blue-400 text-white rounded-md px-4 py-2">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-blue-400 text-white rounded-md px-4 py-2">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
