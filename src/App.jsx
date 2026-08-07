import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import About from "./Pages/About";

import AdminLayout from "./Admin/adLayouts/AdminLayout";
import Dashboard from "./Admin/adpages/Dashboard";
import Members from "./Admin/adpages/Members";
import AddMember from "./Admin/adpages/AddMember";
import Category from "./Admin/adpages/Category";
import CreateCategory from "./Admin/adpages/CreateCategory";
import Subscription from "./Admin/adpages/Subscription";
import Payment from "./Admin/adpages/Payment";
import Program from "./Admin/adpages/Program";
import Classes from "./Admin/adpages/Classes";
import Trainers from "./Admin/adpages/Trainers";
import Testingmonial from "./Admin/adpages/Testingmonial";
import Video from "./Admin/adpages/Video";
import Gallery from "./Admin/adpages/Gallery";
import Blog from "./Admin/adpages/Blog";
import Contact from "./Admin/adpages/Contact";

function App() {
  return (
    <>
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
          <Route path="members/add" element={<AddMember />} />
          <Route path="category" element={<Category />} />
          <Route path="videos/:categoryId" element={<Video />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="subscriptions" element={<Subscription />} />
          <Route path="payments" element={<Payment />} />
          <Route path="programs" element={<Program />} />
          <Route path="classes" element={<Classes />} />
          <Route path="trainers" element={<Trainers />} />
          <Route path="Testimonials" element={<Testingmonial />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="contact" element={<Contact />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
