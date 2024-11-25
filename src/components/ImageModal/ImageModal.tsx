import css from './imgModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  bigPhotoData: {
    data?: string;
    alt?: string;
  };
}

const ImageModale: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  bigPhotoData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={css.customOverlayStyles}
      className={css.customStyles}
      onRequestClose={onClose}
    >
      <button onClick={onClose} type="button" className={css.closeBtn}>
        ❌
      </button>
      <img
        src={bigPhotoData.data}
        alt={bigPhotoData.alt}
        className={css.bigImg}
      />
    </Modal>
  );
};

export default ImageModale;
