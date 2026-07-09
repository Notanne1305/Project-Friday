import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { getMyTasks, updateTaskStatus } from '..sevices/taskService';

export default function MyWorkBorad({userId}) { 
    const [tasks, setTasks] = useState([]);

    const fetchMyTasks = async () => {
        const res = await getMyTasks(userId);
        setTasks(res.data.data);
    }; 

    useEffect(() => {
        fetchMyTasks();
    }, [userId]);

    const handleStatusChange = async (taskId, newStatus) => {
        await updateTaskStatus(taskId, newStatus);

        setTasks((prev) =>
            prev.map((t) => (t.id === taskId ? {...t, status: newStatus } :t))
        );
    };
    
    return ( 
        <div> 
            {tasks.map((task) => (
                <Card key={task.id} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography variant="body2">Status: {task.status}</Typography>
                        {task.status == 'pending' &&(
                            <Button onClick={() => handleStatusChange(task.id, 'in_progress')}>Start</Button>
                        )}
                        {task.status == 'in_progress' &&(
                            <Button onClick={() => handleStatusChange(task.id, 'completed')}>Complete</Button>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}