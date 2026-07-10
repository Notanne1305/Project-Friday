import './kanban.css';

const borderColors = {
    pending: "red",
    in_progress: "blue",
    completed: "green",
};

export default function KanbanCrad({ task, draggable = false, onDragStart }) {
    return (
        <div
            className="kanban-card"
            style={{ borderLeftColor: borderColors[task.status] ?? 'gray' }}
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