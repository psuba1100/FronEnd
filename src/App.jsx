import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./features/home/home";

export default function App(){
    return (
        <Routes>
            <Route path="/" index element={<Home/>} />
        </Routes>
    )
}