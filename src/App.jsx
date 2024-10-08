import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import BotSettings from "./components/BotSettings"
import UserManagement from "./components/UserManagement"
// import { useState } from "react"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bot" element={<BotSettings />} />
                <Route path="/users" element={<UserManagement />} />
            </Routes>
        </Router>
    )
}

export default App
