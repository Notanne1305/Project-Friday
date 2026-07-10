import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { getTasks } from '../services/taskService';
import CreateTaskForm from '../components/CreateTaskForm';
import KanbanBoard from '../components/KanbanBoard';

export default function AdminDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ px: 3, pt: 3, fontWeight: 700 }}>
        Admin Dashboard
      </Typography>
      <div style={{ padding: '0 24px' }}>
        <CreateTaskForm onTaskCreated={fetchTasks} />
      </div>
      {/* Admin board is read-only — no dragging */}
      <KanbanBoard tasks={tasks} draggable={false} />
    </div>
  );
}
