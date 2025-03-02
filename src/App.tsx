import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AnalysisPage } from "./pages/AnalysisPage";
import { HomePage } from "./pages/HomePage";

export const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalysisPage />} />
      </Routes>
    </Router>
  )
}

export default App
