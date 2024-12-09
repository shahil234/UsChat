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
import FriendList from "./pages/FriendList";
import Requests from "./pages/Requests";
import FriendSuggestion from "./pages/FriendSuggestion";
import Navbar from "./ui/components/Navbar";
import { useEffect } from "react";

export default function App() {
  const isLogedIn = useAuth((state) => state.isLogedIn);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login")
  },[isLogedIn])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<FriendList />} />
        <Route path="/suggestion" element={<FriendSuggestion />} />
        <Route path="/notification" element={<div>notification</div>} />
      </Routes>
      <Toaster />
    </>
  );
}
