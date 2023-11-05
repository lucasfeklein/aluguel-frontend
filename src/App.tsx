import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";

function Home() {
  return <div>Home</div>;
}

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
