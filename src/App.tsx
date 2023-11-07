import { Route, Routes } from "react-router-dom";
import Books from "./components/Books";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
