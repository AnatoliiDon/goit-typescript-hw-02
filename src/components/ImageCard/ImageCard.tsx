import css from './imgCard.module.css';
import { PhotoData } from '../../services/types';
import React from 'react';

interface ImageCardProps {
  photoData: PhotoData;
  openModal: (event: React.MouseEvent<HTMLImageElement>) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photoData, openModal }) => {
  return (
    <div className={css.photoContainer}>
      <img
        src={photoData.urls.small}
        alt={photoData.alt_description}
        data-img={photoData.urls.full}
        data-alt={photoData.alt_description}
        width={400}
        height={275}
        onClick={openModal}
      />
    </div>
  );
};

export default ImageCard;
