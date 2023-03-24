import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutProject from "./routes/AboutProject";
import Home from './routes/Home';
import AboutTeam from "./routes/AboutTeam";
import IntroMovie from "./routes/IntroMovie";
import ExecGuide from "./routes/ExecGuide";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/about-project" element={<AboutProject />} />
        <Route path="/intro-movie" element={<IntroMovie />} />
        <Route path="/about-team" element={<AboutTeam />} />
        <Route path="/exec-guide" element={<ExecGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
