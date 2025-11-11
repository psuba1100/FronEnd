import { useAuthStore } from "../store/authStore"
import BtnLogOut from "./BtnLogOut"
import BtnRefreshToken from "./BtnRefreshToken"

export default function DashNavbar() {
    const { username } = useAuthStore()

    return (
        <div className="nav">
            <p>Logged in as {username}</p>
            <BtnLogOut />
            <BtnRefreshToken />
        </div>
    )
}