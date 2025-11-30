import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddEditStudent from "./pages/AddEditStudent.jsx";
import ConfirmDelete from "./pages/ConfirmDelete.jsx";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddEditStudent />} />
        <Route path="/edit/:id" element={<AddEditStudent />} />
        <Route path="/delete/:id" element={<ConfirmDelete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
