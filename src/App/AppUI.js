import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoForm } from '../TodoForm';
import { Modal } from '../Modal';
import { NoMatches } from '../NoMatches.jsx';
import { TodoContext } from '../TodoContext';

function AppUI() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    searchValue
  } = React.useContext(TodoContext);
  
  return (
    <>
      <div className="app-container">

        <div className='big-form-container'>
          <TodoForm />
        </div>

        <div className="todo-container">
          
          <TodoCounter />
          <TodoSearch />

          <TodoList>
            {loading && (
              <>
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
                <TodosLoading />
              </>
            )}
            {error && <TodosError/>}
            {(!loading && searchedTodos.length === 0 && searchValue) && <NoMatches />}
            {(!loading && searchedTodos.length === 0 && !searchValue) && <EmptyTodos />}

            {searchedTodos.map(todo => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
              />
            ))}
          </TodoList>

          
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
