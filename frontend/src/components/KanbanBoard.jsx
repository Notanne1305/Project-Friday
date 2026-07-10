import KanbanColumn from './KanbanColumn';
import './kanban.css';
import { useRef } from 'react';

const COLUMNS = [
    { title: 'To Do', status: 'pending' },
    { title: 'In Progress', status: 'in_progress' },
    { title: 'Completed', status: 'completed' },
];

export default function KanbanBoard({ tasks, draggable = false, onStatusChange }) {
    const draggedId = useRef(null);

    const handleDragStart = (taskId) => {
        draggedId.current = taskId;
    };

    const handleDrop = (newStatus) => {
        if (draggedId.current && onStatusChange) {
            onStatusChange(draggedId.current, newStatus);
        }
        draggedId.current = null;
    };

    return (
        <div className="kanban-board">
            {COLUMNS.map((col) => (
                <KanbanColumn
                    key={col.status}
                    title={col.title}
                    targetStatus={col.status}
                    tasks={tasks.filter((t) => t.status === col.status)}
                    draggableCards={draggable}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
}
