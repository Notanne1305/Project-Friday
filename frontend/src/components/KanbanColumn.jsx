import KanbanCard from './KanbanCard';
import { useState } from 'react';
import './kanban.css';

export default function KanbanColumn({ title, tasks, targetStatus, draggableCards = false, onDragStart, onDrop }) {
    const [isDragOver, setIsDragOver] = useState(false);

    return (
        <div
            className={`kanban-column ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={() => { setIsDragOver(false); onDrop && onDrop(targetStatus); }}
        >
            <div className="kanban-column-header">{title} ({tasks.length})</div>

            {tasks.map((task) => (
                <KanbanCard
                    key={task.id}
                    task={task}
                    draggable={draggableCards}
                    onDragStart={onDragStart}
                />
            ))}

            {tasks.length === 0 && (
                <div style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
                    No tasks here
                </div>
            )}
        </div>
    );
}
