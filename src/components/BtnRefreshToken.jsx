import { API_URL } from "../config";

export default function BtnRefreshToken() {
    const getToken = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${API_URL}/auth/refresh/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })

            const data = await res.json();

            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <button onClick={getToken}>refreshToken</button>
    )
}
