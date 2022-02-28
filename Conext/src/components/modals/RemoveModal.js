import { TodoContext } from '../../store/todo-context';
import { UIContext } from '../../store/UI-context';
import { useContext } from 'react';
import classes from './RemoveModal.module.css';

const RemoveModal = () => {
  const todoCtx = useContext(TodoContext);
  const modalCtx = useContext(UIContext);

  const removeTodoHandler = () => {
    todoCtx.removeTodo(
      modalCtx.modalIdentifier.taskId,
      modalCtx.modalIdentifier.isDone
    );

    modalCtx.resetModal();
  };

  return (
    <div className={classes.removeModal}>
      <p>Are you sure you want to delete this task?</p>
      <div className={classes.actions}>
        <button className={classes.confirm} onClick={removeTodoHandler}>
          Yes
        </button>
        <button className={classes.cancel} onClick={modalCtx.resetModal}>
          No
        </button>
      </div>
    </div>
  );
};

export default RemoveModal;
