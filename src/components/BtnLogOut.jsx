import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { API_URL } from "../config"

export default function BtnLogOut() {
    const { clearAuth } = useAuthStore()
    const navigate = useNavigate()

    const handleLogOut = async (e) => {
        e.preventDefault()

        try {
            const logoutResponse = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
                credentials: "include"
            })

            const logoutData = await logoutResponse.json();

            if (!logoutResponse.ok) throw new Error(logoutData.message || "Logout failed");
            clearAuth()

            navigate("/login");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <button onClick={handleLogOut}>Log out</button>
    )
}
