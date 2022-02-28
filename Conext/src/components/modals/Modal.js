import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';
import RemoveModal from './RemoveModal';
import EditModal from './EditModal';

const portalElement = document.getElementById('modalLayer');

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalTemp = (props) => {
  return <div className={classes.modalTemp}>{props.children}</div>;
};

const Modal = (props) => {
  if (props.type === 'REMOVE') {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClick={props.onClick} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalTemp>
            <RemoveModal />
          </ModalTemp>,
          portalElement
        )}
      </Fragment>
    );
  } else if (props.type === 'EDIT') {
    return (
      <Fragment>
        {ReactDOM.createPortal(
          <Backdrop onClick={props.onClick} />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalTemp>
            <EditModal />
          </ModalTemp>,
          portalElement
        )}
      </Fragment>
    );
  }
};

export default Modal;
