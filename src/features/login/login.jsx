import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export default function Login() {
    const navigate = useNavigate()
    const { setAuth } = useAuthStore();
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const loginResponse = await fetch(`${API_URL}/auth/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include", // important to receive refresh token cookie
            })

            const loginData = await loginResponse.json();

            if (!loginResponse.ok) throw new Error(loginData.message || "Login failed");

            setAuth({
                accessToken: loginData.accessToken,
                username
            });

            navigate("/dashboard");
        }
        catch (err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}