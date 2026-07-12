import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { getMyTasks, updateTaskStatus } from '../services/taskService';
import KanbanBoard from '../components/KanbanBoard';

export default function MyWorkBoard({ userId }) {
    const [tasks, setTasks] = useState([]);

    const fetchMyTasks = async () => {
        const res = await getMyTasks(userId);
        setTasks(res.data.data);
    };

    useEffect(() => {
        fetchMyTasks();
    }, [userId]);

    const handleStatusChange = async (taskId, newStatus) => {
        // Optimistic update — UI changes immediately, no reload needed
        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        );
        await updateTaskStatus(taskId, newStatus);
    };

    return (
        <div>
            <Typography variant="h5" sx={{ px: 3, pt: 3, fontWeight: 700, color:'#1e3a8a' }}>
                My Work Board
            </Typography>
            <KanbanBoard
                tasks={tasks}
                draggable={true}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
