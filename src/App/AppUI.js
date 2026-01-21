import React from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { TodoSection } from '../TodoSection';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import { TodoContext } from '../TodoContext';
import { TodoItem } from '../TodoItem';

function AppUI() {
  const {
    loading,
    error,
    personalTodos,
    laboralTodos,
    todos,
    togglePriority,
    deleteTodo,
    reorderTodos,
    changeTodoCategory,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  const [activeId, setActiveId] = React.useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // Si se suelta sobre una categoría diferente
    if (overId === 'personal' || overId === 'laboral') {
      changeTodoCategory(activeId, overId);
      setActiveId(null);
      return;
    }

    // Si se reordena dentro de la misma lista
    if (activeId !== overId) {
      const oldIndex = todos.findIndex(todo => todo.id === activeId);
      const newIndex = todos.findIndex(todo => todo.id === overId);
      
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      reorderTodos(newTodos);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeTodo = activeId ? todos.find(todo => todo.id === activeId) : null;
  
  return (
    <>
      <div className="app-container">

        <div className='big-form-container'>
          <TodoForm />
        </div>

        <div className="todo-container">
          
          <h1 className="TodoTitle">ToDo Machine</h1>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <TodoSection
              title="Personales"
              category="personal"
              todos={personalTodos}
              loading={loading}
              error={error}
              togglePriority={togglePriority}
              deleteTodo={deleteTodo}
            />

            <TodoSection
              title="Laborales"
              category="laboral"
              todos={laboralTodos}
              loading={loading}
              error={error}
              togglePriority={togglePriority}
              deleteTodo={deleteTodo}
            />

            <DragOverlay>
              {activeTodo ? (
                <TodoItem
                  text={activeTodo.text}
                  priority={activeTodo.priority}
                />
              ) : null}
            </DragOverlay>
          </DndContext>

          
          <CreateTodoButton
            setOpenModal={setOpenModal}
          />
          
          

          {openModal && (
            <Modal>
              <TodoForm />
            </Modal>
          )}
        </div>

        <div className='info-container'>
          <p>Created by 
            <a href="https://diegotellez-portfolio.netlify.app/" target='_blank'> @diegotellezc</a>
          </p>
        </div>
        

      </div>
    </>
  );
}

export { AppUI };
