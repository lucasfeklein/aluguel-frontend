import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

function Register() {
  const [personInfo, setPersonInfo] = useState({
    name: "",
    pin: "",
    address: "",
    birthday: "",
  });

  const { name, pin, address, birthday } = personInfo;

  const navigate = useNavigate();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setPersonInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await api.post("/person/register", { ...personInfo });

    if (response.status === 201) {
      alert("Registration successful");
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-[100px]">
      <h1>Register</h1>
      <form
        className="w-[300px] flex flex-col gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label className="flex justify-between">
            PIN:{" "}
            <input
              className="border rounded-md"
              type="number"
              name="pin"
              value={pin}
              onChange={handleInput}
              required
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between">
            Name:{" "}
            <input
              className="border rounded-md"
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
              required
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between">
            Birthday:{" "}
            <input
              className="border rounded-md"
              type="text"
              name="birthday"
              value={birthday}
              onChange={handleInput}
              required
            />
          </label>
        </div>
        <div>
          <label className="flex justify-between">
            Adress:{" "}
            <input
              className="border rounded-md"
              type="text"
              name="address"
              value={address}
              onChange={handleInput}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white rounded-md px-4 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
