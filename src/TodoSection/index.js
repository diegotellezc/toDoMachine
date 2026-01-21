import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableTodoItem } from '../DraggableTodoItem';
import { TodoList } from '../TodoList';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';

function TodoSection({ title, todos, loading, error, togglePriority, deleteTodo, category }) {
  const { setNodeRef } = useDroppable({
    id: category,
  });

  return (
    <div className="todo-section">
      <h2 className="todo-section-title">{title}</h2>
      <div ref={setNodeRef}>
        <TodoList>
          <SortableContext items={todos.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {loading && (
              <>
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
              </>
            )}
            {error && <TodosError />}
            {(!loading && todos.length === 0) && (
              <p className="empty-section">No hay To-Dos {title.toLowerCase()}</p>
            )}

            {todos.map(todo => (
              <DraggableTodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                priority={todo.priority}
                onPriority={() => togglePriority(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </SortableContext>
        </TodoList>
      </div>
    </div>
  );
}

export { TodoSection };
