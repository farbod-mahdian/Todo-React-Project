import { TodoContext } from '../../store/todo-context';
import { UIContext } from '../../store/UI-context';
import { useContext, useState } from 'react';
import classes from './EditModal.module.css';

const EditModal = () => {
  const todoCtx = useContext(TodoContext);
  const modalCtx = useContext(UIContext);

  const selectedItem = todoCtx.getItemText(
    modalCtx.modalIdentifier.taskId,
    modalCtx.modalIdentifier.isDone
  );

  const [selectedText, setSelectedText] = useState(selectedItem);

  const textChangeHandler = (event) => {
    setSelectedText(event.target.value);
  };

  const editHandler = () => {
    const newText = selectedText;
    if (newText.trim().length === 0) {
      return;
    }

    todoCtx.editTodo(
      modalCtx.modalIdentifier.taskId,
      modalCtx.modalIdentifier.isDone,
      newText
    );

    modalCtx.resetModal();
  };

  return (
    <div className={classes.editModal}>
      <input type="text" value={selectedText} onChange={textChangeHandler} />
      <button onClick={editHandler}>Submit</button>
    </div>
  );
};

export default EditModal;
