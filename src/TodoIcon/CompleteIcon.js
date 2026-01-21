import React from 'react';
import { TodoIcon } from './';

function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="priority"
      color={completed ? '#ff4444' : 'gray'}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };
