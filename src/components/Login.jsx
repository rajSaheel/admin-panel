import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token")

        if (token) {
            localStorage.setItem("user", token)
            navigate("/dashboard")
        }

    }, [navigate])

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/admin/google/login';
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
