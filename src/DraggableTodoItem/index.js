import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoItem } from '../TodoItem';
import './DraggableTodoItem.css';

function DraggableTodoItem({ id, text, priority, onPriority, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handlePriority = (e) => {
    e.stopPropagation();
    onPriority();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="draggable-item">
      <TodoItem
        text={text}
        priority={priority}
        onPriority={handlePriority}
        onDelete={handleDelete}
      />
    </div>
  );
}

export { DraggableTodoItem };
