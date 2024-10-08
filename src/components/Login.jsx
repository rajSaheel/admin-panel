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
        window.location.href = process.env.REACT_APP_ADMIN_LOGIN_URL;
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
