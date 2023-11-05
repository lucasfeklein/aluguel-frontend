import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/person/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const person = response.data;

          if (person) {
            setName(person.name);
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
    setName("");
  };

  return (
    <div className="flex justify-around">
      <p>logo</p>
      {name ? (
        <div className="flex gap-4">
          <p>{name}</p>
          <button
            className="bg-blue-400 text-white rounded-md px-4 py-2"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="bg-blue-400 text-white rounded-md px-4 py-2">
            Login
          </button>
        </Link>
      )}
    </div>
  );
}

export default Header;
