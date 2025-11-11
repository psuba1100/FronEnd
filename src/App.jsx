import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./features/home/home";
import DashLayout from "./components/dash-layout";
import Dash from "./features/dash/dash";
import Login from "./features/login/login";
import Register from "./features/register/register";

export default function App() {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />

                <Route path="login" index element={<Login/>} />
                <Route path="register" index element={<Register/>} />

                <Route path="u" element={<DashLayout />}>
                    <Route element={<Dash />} index />
                </Route>
            </Route>
        </Routes>
    )
}