import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import KanbanBoard from '../components/KanbanBoard';
import { Typography } from '@mui/material';

export default function AdminDashboard({ tasksVersion }) {
  const [tasks, setTasks] = useState([]); //dire taman bai

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, [tasksVersion]);

  return (
    <div>
      <Typography variant="h5" sx={{ px: 3, pt: 3, fontWeight: 700, color: '#1e3a8a' }}>
      Admin Dashboard
      </Typography>

      <KanbanBoard
        tasks={tasks}
        draggable={false}
      />
    </div>
  );
}
