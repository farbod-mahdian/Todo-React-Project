import classes from './TodoItem.module.css';

const TodoItem = (props) => {
  return (
    <li className={classes.todoItem}>
      <span className={classes.text}>{props.text}</span>
      <hr />
      <span className={classes.actions}>
        <button onClick={props.onToggle}>
          {props.isDone ? 'Undone' : 'Done'}
        </button>
        <button onClick={props.onEdit}>Edit</button>
        <button onClick={props.onRemoveTodo}>Delete</button>
      </span>
    </li>
  );
};

export default TodoItem;
