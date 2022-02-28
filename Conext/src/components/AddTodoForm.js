import { useRef, useContext } from 'react';
import { TodoContext } from '../store/todo-context';
import classes from './AddTodoForm.module.css';

const AddTodoForm = () => {
  const todoCtx = useContext(TodoContext);

  const newTodoRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    todoCtx.addTodo(newTodoRef.current.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={newTodoRef} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
