import { CompleteIcon } from '../TodoIcon/CompleteIcon'
import { DeleteIcon } from '../TodoIcon/DeleteIcon'
import React from 'react';
import './TodoItem.css';

function TodoItem(props) {
  const isLongText = props.text.length > 80;
  const textRef = React.useRef(null);

  const handleMouseEnter = (e) => {
    if (textRef.current && isLongText) {
      const rect = textRef.current.getBoundingClientRect();
      textRef.current.style.setProperty('--tooltip-top', `${rect.top}px`);
      textRef.current.style.setProperty('--tooltip-left', `${rect.left + rect.width / 2}px`);
    }
  };
  
  return (
    <li className="TodoItem">
      <CompleteIcon
        completed={props.priority}
        onComplete={props.onPriority}
      />

      <p 
        ref={textRef}
        className={`TodoItem-p ${props.priority && "TodoItem-p--priority"}`}
        {...(isLongText && { 'data-tooltip': props.text })}
        onMouseEnter={handleMouseEnter}
        style={isLongText ? { cursor: 'help' } : {}}
      >
        {props.text}
      </p>

      <DeleteIcon
        onDelete={props.onDelete}
      />
    </li>
  );
}

export { TodoItem };