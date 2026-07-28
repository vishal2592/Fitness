import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import About from "./Pages/About";

import AdminLayout from "./Admin/adlayouts/AdminLayout";
import Dashboard from "./Admin/adpages/Dashboard";
import Members from "./Admin/adpages/Members";

function App() {
  return (
    <>
      {/* Public Navbar */}
      <Navbar />

      <Routes>
        {/* Public Routes (same as before) */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
        </Route>
      </Routes>

      {/* Public Footer */}
      <Footer />
    </>
  );
}

export default App;