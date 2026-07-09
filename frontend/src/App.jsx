import { useState } from 'react';
import { Button } from '@mui/material';
import AdminDashboard from './pages/AdminDashboard';
import MyWorkBoard from './pages/MyWorkBoard';
import './App.css';

function App() {
  const [view, setView] = useState('admin');
  const currentUserId = 1; // hardcode for now, per task's "Implementation Tip"

  return (
    <div>
      <Button onClick={() => setView('admin')}>View as Admin</Button>
      <Button onClick={() => setView('employee')}>View as Employee</Button>

      {view === 'admin' ? <AdminDashboard /> : <MyWorkBoard userId={currentUserId} />}
    </div>
  );
}

export default App;