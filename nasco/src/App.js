import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Views/Home/index";
import Create from "./Views/NewEmployee/index";
import Update from "./Views/UpdateEmploye/index";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/employee/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
