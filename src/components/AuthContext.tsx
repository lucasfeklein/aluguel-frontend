import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";

type Person = {
  pin: string;
  name: string;
  birthday: string;
  address: string;
};

type AuthContextType = {
  person: Person | undefined;
  handleLogin: (pin: string) => void;
  setPerson: React.Dispatch<React.SetStateAction<Person | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: any }) {
  const [person, setPerson] = useState<Person | undefined>(undefined);

  const navigate = useNavigate();

  const handleLogin = async (pin: string) => {
    const response = await api.post("/auth/", {
      pin,
    });
    const { token, person } = response.data;

    setPerson(person);

    localStorage.setItem("token", token);

    navigate("");
  };

  return (
    <AuthContext.Provider value={{ person, handleLogin, setPerson }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error");
  return context;
}
