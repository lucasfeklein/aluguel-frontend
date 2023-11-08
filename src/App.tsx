import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Header from "./components/Header";
import Login from "./components/Login";
import MyRentals from "./components/MyRentals";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/myrentals" element={<MyRentals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
