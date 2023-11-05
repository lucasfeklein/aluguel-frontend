import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/auth", {
      pin,
    });
    const { token } = response.data;

    localStorage.setItem("token", token);
  };
  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleLogin}>
        <input
          className="border border-gray-600"
          type="text"
          placeholder="Enter your PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button
          className="bg-blue-400 text-white rounded-md px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
