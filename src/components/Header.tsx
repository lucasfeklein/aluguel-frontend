import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../axiosConfig";
import { useAuth } from "./AuthContext";

function Header() {
  const { person, setPerson } = useAuth();
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
  };

  return (
    <div className="flex justify-around items-center">
      <p>logo</p>
      {person?.name ? (
        <div className="flex gap-4 items-center">
          <p>{person.name}</p>
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
