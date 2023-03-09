import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutProject from "./routes/AboutProject";
import Home from './routes/Home';
import AboutTeam from "./routes/AboutTeam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-project" element={<AboutProject />} />
        <Route path="/about-team" element={<AboutTeam />} />
      </Routes>
    </Router>
  );
}

export default App;
