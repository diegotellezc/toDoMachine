import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';

function TodoForm() {
  const {
    addTodo,
    setOpenModal,
  } = React.useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = React.useState('');
  const [category, setCategory] = React.useState('laboral');

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue, category);
    setOpenModal(false);
    setNewTodoValue("");
    setCategory('laboral');
  };

  const onCancel = () => {
    setOpenModal(false);
    setNewTodoValue("");
    setCategory('laboral');
  };

  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Agrega un To-Do</label>
      <textarea
        required
        placeholder="Escribe aquí"
        value={newTodoValue}
        onChange={onChange}
      />
      <div className="TodoForm-categoryContainer">
        <label className="TodoForm-categoryLabel">
          <input
            type="radio"
            name="category"
            value="personal"
            checked={category === 'personal'}
            onChange={(e) => setCategory(e.target.value)}
          />
          Personal
        </label>
        <label className="TodoForm-categoryLabel">
          <input
            type="radio"
            name="category"
            value="laboral"
            checked={category === 'laboral'}
            onChange={(e) => setCategory(e.target.value)}
          />
          Laboral
        </label>
      </div>
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >Cancelar</button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >Agregar</button>
      </div>
    </form>
  );
}

export { TodoForm };
