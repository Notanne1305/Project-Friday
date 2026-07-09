import { Card, CardContent, Typography } from '@mui/material';

export default function TaskCard({ task}){
    return(
        <Card sx={{ marginBottom: 2}}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="caption">Status: {task.status}</Typography>
                <Typography variant="body2">
                    Assigned: {task.assigned_users.map((u) => u.name).join(', ')}
                </Typography>
            </CardContent>
        </Card>
    );
}