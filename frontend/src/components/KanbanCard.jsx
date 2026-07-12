import './kanban.css';

const borderColors = {
    pending: '#780202',      // Dull, strong deep red (Burgundy)
    in_progress: '#002245',  // Dull, strong deep blue (Midnight/Navy)
    completed: '#008638',    // Dull, strong deep green (Forest/Sage)   
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

export default function KanbanCard({ task, draggable = false, onDragStart }) {
    const currentBackground = statusBackground[task.status] ?? {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.5), 0 4px 15px rgba(0, 0, 0, 0.05)',
    };

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
                borderLeftWidth: '6px'
                
            }}
            draggable={draggable}
            onDragStart={onDragStart ? () => onDragStart(task.id) : undefined}
        >
            <div className="kanban-card-title">{task.title}</div>
            <div className="kanban-card-desc">{task.description}</div>
            <div className="kanban-card-footer">
                {task.assigned_user?.map((u) => (
                    <div className="kanban-avatar" key={u.id} title={u.name}>
                        {u.name.charAt(0).toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
}
