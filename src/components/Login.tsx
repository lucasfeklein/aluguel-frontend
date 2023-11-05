import { useState } from "react";
import { useAuth } from "./AuthContext";

function Login() {
  const [pin, setPin] = useState("");
  const { handleLogin } = useAuth();

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(pin);
        }}
      >
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
