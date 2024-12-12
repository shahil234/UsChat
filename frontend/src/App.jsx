import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./store/useAuth";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./ui/components/Navbar";
import { useEffect } from "react";
import Users from "./pages/Users";
import Requests from "./pages/Requests";
import Friends from "./pages/Friends";

export default function App() {
  const isLogedIn = useAuth((state) => state.isLogedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLogedIn){
      navigate("/login")
    }
  },[isLogedIn]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/suggestion" element={<Users />} />
        <Route path="/notification" element={<div>notification</div>} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
      <Toaster />
    </>
  );
}
