import { useState } from 'react';
import './kanban.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const borderColors = {
    pending: '#780202',
    in_progress: '#002245',
    completed: '#008638',
};

const statusBackground = {
    pending: {
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        boxShadow: 'inset 0 1px 1px rgba(255, 100, 100, 0.4), 0 4px 15px rgba(0, 0, 0, 0.05)',
    },
    in_progress: {
        backgroundColor: 'rgba(0, 0, 255, 0.12)',
        boxShadow: 'inset 0 1px 1px rgba(100, 100, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.05)',
    },
    completed: {
        backgroundColor: 'rgba(0, 128, 0, 0.15)',
        boxShadow: 'inset 0 1px 1px rgba(100, 255, 100, 0.4), 0 4px 15px rgba(0, 0, 0, 0.05)',
    }
};

const priorityColors = {
    low: '#6b7280',
    medium: '#d97706',
    high: '#dc2626',
};

const MAX_VISIBLE_AVATARS = 3;

export default function KanbanCard({ task, draggable = false, onDragStart }) {
    const [showAllAvatars, setShowAllAvatars] = useState(false);

    const currentBackground = statusBackground[task.status] ?? {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.5), 0 4px 15px rgba(0, 0, 0, 0.05)',
    };

    const assignedUsers = task.assigned_users ?? [];
    const visibleUsers = showAllAvatars ? assignedUsers : assignedUsers.slice(0, MAX_VISIBLE_AVATARS);
    const hiddenCount = assignedUsers.length - MAX_VISIBLE_AVATARS;

    return (
        <div
            className="kanban-card"
            style={{
                borderLeftColor: borderColors[task.status] ?? 'gray',
                backgroundColor: currentBackground.backgroundColor,
                boxShadow: currentBackground.boxShadow,
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderLeftWidth: '6px',
            }}
            draggable={draggable}
            onDragStart={onDragStart ? () => onDragStart(task.id) : undefined}
        >
            {task.image_url && (
                <img
                    src={task.image_url}
                    alt={task.title}
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }}
                />
            )}

            <div className="kanban-card-title">{task.title}</div>
            <div className="kanban-card-desc">{task.description}</div>

            {/* Single row: priority + deadline + avatars */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    {task.priority && (
                        <span
                            style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: 'white',
                                backgroundColor: priorityColors[task.priority] ?? '#6b7280',
                                padding: '2px 8px',
                                borderRadius: '4px',
                            }}
                        >
                            {task.priority}
                        </span>
                    )}
                    {task.deadline && (
                        <span style={{ fontSize: '12px', color: '#374151', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CalendarTodayIcon sx={{ fontSize: 14 }} />
                            {new Date(task.deadline).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <div className="kanban-card-footer" style={{ marginBottom: 0 }}>
                    {visibleUsers.map((u) => (
                        <div className="kanban-avatar" key={u.id} title={u.name}>
                            {u.name.charAt(0).toUpperCase()}
                        </div>
                    ))}
                    {!showAllAvatars && hiddenCount > 0 && (
                        <div
                            className="kanban-avatar"
                            style={{ cursor: 'pointer', backgroundColor: '#e5e7eb', color: '#374151' }}
                            onClick={() => setShowAllAvatars(true)}
                        >
                            +{hiddenCount}
                        </div>
                    )}
                    {showAllAvatars && assignedUsers.length > MAX_VISIBLE_AVATARS && (
                        <div
                            className="kanban-avatar"
                            style={{ cursor: 'pointer', backgroundColor: '#e5e7eb', color: '#374151' }}
                            onClick={() => setShowAllAvatars(false)}
                        >
                            −
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}