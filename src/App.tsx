import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SubjectInputPage from "./pages/SubjectInputPage";
import PredictionPage from "./pages/PredictionPage";
import ReverseGPA from "./pages/ReverseGPA";
import { SubjectProvider } from "./context/SubjectContext";

function App() {
  return (
    <SubjectProvider>
      <BrowserRouter>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>📘 成績入力</Link>
        <Link to="/predict" style={{ marginRight: "1rem" }}>🔮 成績予測</Link>
        <Link to="/reverse">🎯 目標GPA逆算</Link>
      </nav>

      <Routes>
        <Route path="/" element={<SubjectInputPage />} />
        <Route path="/predict" element={<PredictionPage />} />
        <Route path="/reverse" element={<ReverseGPA />} />
      </Routes>
    </BrowserRouter>
    </SubjectProvider>
  );
}

export default App;
