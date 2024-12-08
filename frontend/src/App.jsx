import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useAuth } from "./store/useAuth";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import FriendList from "./pages/FriendList";
import Requests from "./pages/Requests";
import FriendSuggestion from "./pages/FriendSuggestion";

export default function App(){
    const isLogedIn = useAuth(state => state.isLogedIn);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/friendList" element={<FriendList />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/suggestion" element={<FriendSuggestion />} />
                </Routes>
            </Router>
        </>
    )
}