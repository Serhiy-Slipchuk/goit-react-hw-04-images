import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = function ({ imageURL, largeImageURL, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <li className={css['gallery-item']}>
        <img
          className={css['gallery-item-image']}
          src={imageURL}
          alt={id}
          onClick={openModal}
        />
      </li>
      {isModalOpen && (
        <Modal largeImageURL={largeImageURL} id={id} closeModal={closeModal} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
