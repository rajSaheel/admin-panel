import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    // Fetch users from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/admin/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    // Handle block/unblock user
    const handleBlockUnblock = (chatId, isBlocked) => {
        axios.patch(`http://localhost:5000/admin/users/${chatId}`, { blocked: !isBlocked })
            .then(() => {
                setUsers(users.map(user =>
                    user.chatId === chatId ? { ...user, blocked: !isBlocked } : user
                ));
            })
            .catch(error => console.error('Error updating user status:', error));
    };

    // Handle delete user
    const handleDeleteUser = (chatId) => {
        axios.delete(`http://localhost:5000/admin/users/${chatId}`)
            .then(() => {
                setUsers(users.filter(user => user.chatId !== chatId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div>
            <h2>User Management</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Chat ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.chatId}</TableCell>
                            <TableCell>{user.blocked ? 'Blocked' : 'Active'}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={() => handleBlockUnblock(user.chatId, user.blocked)}
                                    variant="contained"
                                    color={user.blocked ? 'secondary' : 'primary'}
                                    startIcon={user.blocked ? <LockOpenIcon /> : <BlockIcon />}
                                >
                                    {user.blocked ? 'Unblock' : 'Block'}
                                </Button>
                                <Button
                                    onClick={() => handleDeleteUser(user.chatId)}
                                    variant="contained"
                                    color="default"
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserManagement;
