import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import TaskCard from '../components/TaskCard';
import CreateTaskForm from '../components/CreateTaskForm';

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
      <CreateTaskForm onTaskCreated={fetchTasks} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}