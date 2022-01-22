import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./components/HomePage";
import WordPage from "./components/WordPage";
import POS from "./components/POS";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:word" element={<WordPage />} />
        <Route path="/:word/:pos" element={<WordPage />} />
        <Route path="/part-of-speech/:pos" element={<POS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
