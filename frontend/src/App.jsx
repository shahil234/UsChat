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
import PopUpContainer from "./ui/common/PopUpContainer";
import MyProfile from "./pages/MyProfile";
import Photos from "./pages/Photos";
import OthersProfile from "./pages/OthersProfile";
import Comment from "./pages/Comment";
import MessageList from "./pages/MessageList";
import Chats from "./pages/Chats";

export default function App() {
  const isLogedIn = useAuth((state) => state.isLogedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogedIn){
      navigate("/login")
    }
  },[isLogedIn]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/suggestion" element={<Users />} />
        <Route path="/notification" element={<div>notification</div>} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/profile/:id" element={<OthersProfile />} />
        <Route path="/comment/:id" element={<Comment />} />
        <Route path="/messageList" element={<MessageList />} >
          <Route index path="chat" element={<Chats />} />
        </Route>
      </Routes>
      <Toaster />
      <PopUpContainer />
    </div>
  );
}
