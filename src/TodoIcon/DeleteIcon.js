import React from 'react';
import { TodoIcon } from './';

function DeleteIcon({ onDelete }) {
  return (
    <TodoIcon
      type="delete"
      color="#881708e7"
      onClick={onDelete}
    />
  );
}

export { DeleteIcon };
