import React from 'react';
import { TodoIcon } from './';

function CompleteIcon({ completed, onComplete }) {
  return (
    <TodoIcon
      type="check"
      color={completed ? '#16e81d' : 'gray'}
      onClick={onComplete}
    />
  );
}

export { CompleteIcon };
