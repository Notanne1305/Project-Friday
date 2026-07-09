import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { getUsers } from '../services/userService';
import { createTask } from '../services/taskService';

export default function CreateTaskForm({ onTaskCreated }){
    const [title, setTitle] = useState('');
    const [description, setDescription] =useState('')
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect (()=> {
        getUsers().then((res)=> setUsers(res.data.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask({ title, description, user_ids: selectedUserIds});
        setTitle('');
        setDescription('');
        setSelectedUserIds([]);
        onTaskCreated(); 
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <TextField label = "Title" value={title} onChange={(e) => setTitle(e.target.value)} required /> 
            <TextField label = "Description" value={description} onChange={(e) => setDescription(e.target.value)} required /> 
            <FormControl fullWidth>
                <InputLabel>Assign Employeed</InputLabel>
                <Select
                    multiple
                    value={selectedUserIds}
                    onChange={(e) => setSelectedUserIds(e.target.value)}
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id} > {user.name}</MenuItem>
                    ))}
                </Select>
            </FormControl> 
            <Button type="submit" variant="contained">Create Task</Button>
        </form>
    );
}
