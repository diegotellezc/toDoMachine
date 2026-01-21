import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  // Migración: Agregar IDs a todos existentes que no los tengan
  React.useEffect(() => {
    if (!loading && todos.length > 0) {
      const needsMigration = todos.some(todo => !todo.id);
      if (needsMigration) {
        const migratedTodos = todos.map((todo, index) => ({
          ...todo,
          id: todo.id || `${Date.now()}-${index}`,
          category: todo.category || 'laboral',
          priority: todo.priority || false
        }));
        saveTodos(migratedTodos);
      }
    }
  }, [loading]);

  const completedTodos = todos.filter(
    todo => !!todo.priority
  ).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );

  const personalTodos = searchedTodos.filter(todo => todo.category === 'personal');
  const laboralTodos = searchedTodos.filter(todo => todo.category === 'laboral');

  const addTodo = (text, category = 'laboral') => {
    const newTodos = [...todos];
    newTodos.push({
      id: Date.now().toString(),
      text,
      priority: false,
      category,
    });
    saveTodos(newTodos);
  };

  const togglePriority = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.id === id
    );
    
    newTodos[todoIndex].priority = !newTodos[todoIndex].priority;
    
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.id === id
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const reorderTodos = (updatedTodos) => {
    saveTodos(updatedTodos);
  };

  const changeTodoCategory = (todoId, newCategory) => {
    const newTodos = todos.map(todo => 
      todo.id === todoId ? { ...todo, category: newCategory } : todo
    );
    saveTodos(newTodos);
  };
  
  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      personalTodos,
      laboralTodos,
      todos,
      addTodo,
      togglePriority,
      deleteTodo,
      reorderTodos,
      changeTodoCategory,
      openModal,
      setOpenModal,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
