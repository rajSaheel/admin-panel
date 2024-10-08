import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Settings = () => {
    const [settings, setSettings] = useState({
        apiKey: '',
        botDescription: ''
    });
    const [loading, setLoading] = useState(true);

    // Fetch current bot settings when the component loads
    useEffect(() => {
        axios.get('/admin/bot-settings')
            .then(response => {
                setSettings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching bot settings:', error);
                setLoading(false);
            });
    }, []);

    // Handle form field change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSettings({
            ...settings,
            [name]: value
        });
    };

    // Submit the updated settings
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/admin/bot-settings', settings)
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
            <Typography variant="h4" gutterBottom>Bot Settings</Typography>

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

                    {/* Bot Description Field */}
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
