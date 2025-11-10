import { useState } from "react";
import { useAuthStore } from "../../store/authStore.js";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config.js";

const standardPwRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~])[A-Za-z\d!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]{8,32}$/;

export default function Register() {
    const navigate = useNavigate()
    const { setAuth } = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!standardPwRegex.test(password)) {
            setError(
                "Password must contain at least 8 characters, one uppercase letter, one number and one special character."
            );
            return;
        }

        if (password !== repeatPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const registerResp = await fetch(`${API_URL}/u/users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const registerData = await registerResp.json();

            if (!registerResp.ok)
                throw new Error(registerData.message || "Registration failed");

            if (registerResp.status === 201) {
                const loginResp = await fetch(`${API_URL}/auth/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                    credentials: "include", // important to receive refresh token cookie
                });

                const loginData = await loginResp.json();

                if (!loginResp.ok) throw new Error(loginData.message || "Login failed");

                setAuth({
                    accessToken: loginData.accessToken,
                    username
                });

                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Create an Account</h2>
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
                <input
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
