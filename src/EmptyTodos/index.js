import React from 'react';
import './EmptyTodos.css';

function EmptyTodos() {

  return (
    <div className='empty-container'>
      <p className='empty-text-mobile'>Click on the icon <i className='bx bxs-plus-circle plus-icon'></i> in the lower right corner to create your first To-Do.</p>
      <p className='empty-text-desktop'>You have not created a To-Do yet.</p>
    </div>
  );
}

export { EmptyTodos };
