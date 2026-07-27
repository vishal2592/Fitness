import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./Admin/adLayouts/AdminLayout";
// Public Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Public Pages
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Admin/adpages/Dashboard";
import Members from "./Admin/adpages/Members";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Navbar />
            <LoginPage />
            <Footer />
          </>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path ="members" element={<Members/>}/>
      </Route>
    </Routes>
  );
}

export default App;