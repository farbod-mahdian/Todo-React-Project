import { Fragment, useContext } from 'react';
import Modal from '../components/modals/Modal';
import classes from './Layout.module.css';
import { UIContext } from '../store/UI-context';

const Layout = (props) => {
  const modalCtx = useContext(UIContext);

  return (
    <Fragment>
      {modalCtx.show && (
        <Modal
          type={modalCtx.modalIdentifier.act}
          onClick={modalCtx.resetModal}
        />
      )}
      <div className={classes.main}>{props.children}</div>
    </Fragment>
  );
};

export default Layout;
