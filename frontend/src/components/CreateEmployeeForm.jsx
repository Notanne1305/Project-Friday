import { useState } from 'react';
import { TextField, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createUser } from '../services/userService';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

export default function CreateEmployeeForm({ open, onClose, onEmployeeCreated }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const passwordTooShort = password.length > 0 && password.length < 8;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert('Password must be at least 8 characters.');
            return;
        }

        try {
            await createUser({ name, email, password });
            setName('');
            setEmail('');
            setPassword('');
            if (onEmployeeCreated) onEmployeeCreated();
            onClose();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to add employee.';
            alert(errorMessage);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box sx={{ position: 'relative', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e3a8a' }}>
                        ADD EMPLOYEE
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        sx={{ position: 'absolute', top: -8, right: -8, color: 'text.secondary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        error={passwordTooShort}
                        helperText={passwordTooShort ? 'Password must be at least 8 characters' : 'Must be at least 8 characters'}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
                        ADD EMPLOYEE
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}