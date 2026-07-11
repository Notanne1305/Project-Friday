import { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUsers } from '../services/userService';
import { createTask } from '../services/taskService';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    bgcolor: 'white',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

export default function CreateTaskForm({ open, onClose, onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('medium');
    const [deadline, setDeadline] = useState('');
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect(() => {
        if (open) {
            getUsers().then((res) => setUsers(res.data.data));
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('priority', priority);
        if (deadline) formData.append('deadline', deadline);
        selectedUserIds.forEach(id => formData.append('user_ids[]', id));
        if (image) formData.append('image', image);

        try {
            await createTask(formData);
            // Reset form
            setTitle('');
            setDescription('');
            setPriority('medium');
            setDeadline('');
            setImage(null);
            setSelectedUserIds([]);
            onTaskCreated();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to create task.');
        }

    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        CREATE NEW TASK
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <FormControl>
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} onChange={(e) => setPriority(e.target.value)} label="Priority">
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField type="date" label="Deadline" InputLabelProps={{ shrink: true }} value={deadline} onChange={(e) => setDeadline(e.target.value)} />

                    <Button variant="outlined" component="label">
                        Upload Task Image
                        <input type="file" hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                    </Button>
                    {image && <span>{image.name}</span>}



                    <FormControl>
                        <InputLabel>Assign Employee</InputLabel>
                        <Select multiple value={selectedUserIds} onChange={(e) => setSelectedUserIds(e.target.value)} label="Assign Employee">
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id} > {user.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary">Create Task</Button>
                </form>
            </Box>
        </Modal>
    );
}
