import React, { useState } from 'react';

export const TodoContext = React.createContext({
  pendingItems: [],
  doneItems: [],
  itemsAvailable: false,
  addTodo: (newTodo) => {},
  removeTodo: (id) => {},
  toggleList: () => {},
  editTodo: () => {},
  getItemText: () => {},
});

let nexetAvailableId = 0;

const TodoContextProvider = (props) => {
  const [pendingItems, setPendingItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  const addTodoHandler = (newTodo) => {
    if (newTodo.trim().length === 0) {
      return;
    }

    const newTodoId = nexetAvailableId;

    setPendingItems((prevItems) => {
      return [{ id: newTodoId, text: newTodo }, ...prevItems];
    });

    nexetAvailableId += 1;
  };

  const removeTodoHandler = (id, isDone) => {
    if (!isDone) {
      if (pendingItems.length === 1) {
        setPendingItems([]);
      } else {
        setPendingItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      }
    } else {
      if (doneItems.length === 1) {
        setDoneItems([]);
      } else {
        setDoneItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    }
  };

  const toggleList = (id, isDone) => {
    if (!isDone) {
      const selectedItem = pendingItems.find((item) => item.id === id);
      const newTodoId = 'd' + selectedItem.id;

      setDoneItems((prevDoneItems) => [
        { id: newTodoId, text: selectedItem.text },
        ...prevDoneItems,
      ]);
    } else {
      const selectedItem = doneItems.find((item) => item.id === id);
      const newTodoId = selectedItem.id.substr(1);

      setPendingItems((prevPendingItems) => [
        { id: newTodoId, text: selectedItem.text },
        ...prevPendingItems,
      ]);
    }

    removeTodoHandler(id, isDone);
  };

  const editTodo = (id, isDone, newText) => {
    if (!isDone) {
      const selectedItemIndex = pendingItems.findIndex(
        (item) => item.id === id
      );

      setPendingItems((prevPendingItems) => {
        prevPendingItems[selectedItemIndex].text = newText;
        return prevPendingItems;
      });
    } else {
      const selectedItemIndex = doneItems.findIndex((item) => item.id === id);

      setDoneItems((prevDoneItems) => {
        prevDoneItems[selectedItemIndex].text = newText;
        return prevDoneItems;
      });
    }
  };

  const getItemText = (id, isDone) => {
    if (!isDone) {
      const selectedItem = pendingItems.find((item) => item.id === id);
      return selectedItem.text;
    } else {
      const selectedItem = doneItems.find((item) => item.id === id);
      return selectedItem.text;
    }
  };

  const contextValue = {
    pendingItems: pendingItems,
    doneItems: doneItems,
    itemsAvailable: false,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
    toggleList: toggleList,
    editTodo: editTodo,
    getItemText: getItemText,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
