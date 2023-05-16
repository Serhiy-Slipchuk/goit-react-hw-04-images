import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = function ({ largeImageURL, id, closeModal }) {
  useEffect(() => {
    const handlerKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handlerKeyDown);

    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={id} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
