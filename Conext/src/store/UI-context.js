import React, { useReducer } from 'react';

export const UIContext = React.createContext({
  show: false,
  modalIdentifier: { taskId: null, isDone: null, act: null },
  showEditModal: () => {},
  showRemoveModal: () => {},
  showSubmitModal: () => {},
  resetModal: () => {},
});

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'REMOVE':
    case 'EDIT':
    case 'SUBMIT':
      return {
        show: true,
        modalIdentifier: {
          taskId: action.id,
          isDone: action.isDone,
          act: action.type,
        },
      };
    case 'RESET':
      return {
        show: false,
        modalIdentifier: { taskId: null, isDone: null, act: null },
      };
    default:
      console.log('Wrong request!');
  }
};

const UIContextProvider = (props) => {
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    show: false,
    modalIdentifier: { taskId: null, isDone: null, act: null },
  });

  const showEditModal = (taskId, isDone) => {
    dispatchModal({ type: 'EDIT', id: taskId, isDone: isDone });
  };

  const showRemoveModal = (taskId, isDone) => {
    dispatchModal({ type: 'REMOVE', id: taskId, isDone: isDone });
  };

  const showSubmitModal = (taskId, isDone) => {
    dispatchModal({ type: 'SUBMIT', id: taskId, isDone: isDone });
  };

  const resetModal = () => {
    dispatchModal({ type: 'RESET' });
  };

  const UIContextValue = {
    show: modalState.show,
    modalIdentifier: modalState.modalIdentifier,
    showEditModal: showEditModal,
    showRemoveModal: showRemoveModal,
    showSubmitModal: showSubmitModal,
    resetModal: resetModal,
  };

  return (
    <UIContext.Provider value={UIContextValue}>
      {props.children}
    </UIContext.Provider>
  );
};

export default UIContextProvider;
