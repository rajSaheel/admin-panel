import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Settings = () => {
    const [settings, setSettings] = useState({
        apiKey: '',
        botDescription: '',
        botName: '',
        about: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/botsettings')
            .then(response => {
                setSettings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching bot settings:', error);
                setLoading(false);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSettings({
            ...settings,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.patch('http://localhost:5000/botsettings', settings)
            .then(response => {
                alert('Settings updated successfully');
            })
            .catch(error => {
                console.error('Error updating bot settings:', error);
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User Management</h2>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* API Key Field */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="API Key"
                                    name="apiKey"
                                    fullWidth
                                    value={settings.apiKey}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bot Name */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="Bot Name"
                                    name="botName"
                                    fullWidth
                                    value={settings.botName}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bot About */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="About"
                                    name="about"
                                    fullWidth
                                    multiline
                                    rows={2}
                                    value={settings.about}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Bot Description */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <TextField
                                    label="Bot Description"
                                    name="botDescription"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={settings.botDescription}
                                    onChange={handleInputChange}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Save Settings
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Settings;
