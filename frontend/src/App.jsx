import { useState, useEffect } from 'react';
import { Button, MenuItem, Select, FormControl, InputLabel, Box, Typography, Fade, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AdminDashboard from './pages/AdminDashboard';
import MyWorkBoard from './pages/MyWorkBoard';
import CreateTaskForm from './components/CreateTaskForm';
import CreateEmployeeForm from './components/CreateEmployeeForm';
import { getUsers } from './services/userService';
import './App.css';

function App() {
  const [view, setView] = useState('admin');
  const [currentUserId, setCurrentUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [tasksVersion, setTasksVersion] = useState(0);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const triggerTasksRefresh = () => {
    setTasksVersion((prev) => prev + 1);
  };

  const handleEmployeeCreated = () => {
    fetchUsers();
  };

  return (
    <div>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px 24px',
          bgcolor: '#ffffff',
        }}
      >
        <Typography variant="h6" sx={{ color: '#0f4a8a', fontWeight: 'bold' }}>
          Project Friday
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'nowrap' }}>
          {view === 'admin' && (
            <>
              <Button variant="outlined" onClick={() => setIsEmployeeModalOpen(true)}>
                + Add Employee
              </Button>
              <Button variant="contained" color="primary" onClick={() => setIsTaskModalOpen(true)}>
                + Create Task
              </Button>
            </>
          )}

          {view === 'employee' && (
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Select Employee</InputLabel>
              <Select
                value={currentUserId}
                label="Select Employee"
                onChange={(e) => setCurrentUserId(e.target.value)}
              >
                {users.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, newView) => {
              if (newView !== null) {
                setView(newView);
                if (newView === 'employee' && !currentUserId && users.length > 0) {
                  setCurrentUserId(users[0].id);
                }
              }
            }}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'primary.main',
                backgroundColor: '#ffffff',
                border: '1px solid',
                borderColor: 'primary.main',
              },
              '& .MuiToggleButton-root.Mui-selected': {
                backgroundColor: 'primary.main',
                color: '#ffffff',
              },
              '& .MuiToggleButton-root.Mui-selected:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <ToggleButton value="admin">Admin</ToggleButton>
            <ToggleButton value="employee">Employee</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Main Board View with fade transition */}
      <Fade in={true} key={view} timeout={300}>
        <Box>
          {view === 'admin' ? (
            <AdminDashboard tasksVersion={tasksVersion} />
          ) : currentUserId ? (
            <MyWorkBoard userId={currentUserId} />
          ) : (
            <Typography p={4}>Select an employee from the header to view tasks.</Typography>
          )}
        </Box>
      </Fade>

      {/* Modals */}
      <CreateTaskForm open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onTaskCreated={triggerTasksRefresh} />
      <CreateEmployeeForm open={isEmployeeModalOpen} onClose={() => setIsEmployeeModalOpen(false)} onEmployeeCreated={handleEmployeeCreated} />
    </div>
  );
}

export default App;