import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function About() {
  return <div>oi</div>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
