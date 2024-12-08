import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useAuth } from "./store/useAuth";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App(){
    const isLogedIn = useAuth(state => state.isLogedIn);
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </>
    )
}