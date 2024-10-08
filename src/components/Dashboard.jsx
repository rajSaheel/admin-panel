import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Button } from '@mui/material';
import UserManagement from './UserManagement';
import BotSettings from "./BotSettings"
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [user, setUser] = useState(localStorage.getItem("user"))
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) navigate("/login")
    }, [navigate, user])

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleLogout = () => {
        localStorage.clear("user")
        setUser(() => undefined)
        console.log('Logout clicked');
    };

    return (
        user &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                style={{ alignSelf: 'flex-end', margin: '10px' }}
            >
                Logout
            </Button>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                centered
                style={{ marginTop: '20px' }}
            >
                <Tab label="Users" />
                <Tab label="Bot Settings" />
            </Tabs>
            <div style={{ marginTop: '20px', width: '100%' }}>
                {selectedTab === 0 && <UserManagement />}
                {selectedTab === 1 && <BotSettings />}
            </div>
        </div>
    );
};

export default Dashboard;