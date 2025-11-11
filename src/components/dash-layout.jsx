import { Outlet } from "react-router-dom"
import DashNavbar from "./dash-navbar"
import DashFooter from "./dash-footer"

export default function DashLayout() {
    return (
        <>
            <DashNavbar />
            <div className="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}