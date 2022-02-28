import TodoItem from './TodoItem';
import { TodoContext } from '../store/todo-context';
import { UIContext } from '../store/UI-context';
import { useContext } from 'react';
import classes from './TodoList.module.css';

const TodoList = (props) => {
  const todoCtx = useContext(TodoContext);
  const modalCtx = useContext(UIContext);

  if (!props.isDone) {
    if (todoCtx.pendingItems.length === 0) {
      return <p>No items available</p>;
    }

    return (
      <ul className={classes.todoList}>
        {todoCtx.pendingItems.map((item) => (
          <TodoItem
            key={item.id}
            text={item.text}
            isDone={props.isDone}
            onRemoveTodo={modalCtx.showRemoveModal.bind(
              null,
              item.id,
              props.isDone
            )}
            onEdit={modalCtx.showEditModal.bind(null, item.id, props.isDone)}
            onToggle={todoCtx.toggleList.bind(null, item.id, props.isDone)}
          />
        ))}
      </ul>
    );
  } else {
    if (todoCtx.doneItems.length === 0) {
      return <p>No items available</p>;
    }

    return (
      <ul className={classes.todoList}>
        {todoCtx.doneItems.map((item) => (
          <TodoItem
            key={item.id}
            text={item.text}
            isDone={props.isDone}
            onRemoveTodo={modalCtx.showRemoveModal.bind(
              null,
              item.id,
              props.isDone
            )}
            onEdit={modalCtx.showEditModal.bind(null, item.id, props.isDone)}
            onToggle={todoCtx.toggleList.bind(null, item.id, props.isDone)}
          />
        ))}
      </ul>
    );
  }
};

export default TodoList;
