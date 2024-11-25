import { useState, useEffect, MouseEvent } from 'react';
import axios from 'axios';
import './App.css';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';

import { PhotoData, BigPhotoData, FetchPhotosResponse } from './services/types';

function App() {
  const [query, setQuery] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [photosData, setPhotosData] = useState<PhotoData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bigPhotoData, setBigPhotoData] = useState<BigPhotoData>({});
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const accessKey = 'r21YpYkIhEbJxvNOZ4mo7wQhCUtlMTjvYkyu5-o3dhk';
  const onSubmit = (searchedValue: string) => {
    if (searchedValue === query) {
      return;
    }
    setPhotosData([]);
    setPage(1);
    setQuery(searchedValue);
  };

  useEffect(() => {
    const fetchPhotos = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (query === null) {
          return;
        }
        const { data } = await axios.get<FetchPhotosResponse>(
          `https://api.unsplash.com/search/photos?page=${page}&client_id=${accessKey}&query=${query}&orientation=landscape&per_page=9`
        );
        setPhotosData([...photosData, ...data.results]);
        console.log(photosData);
        console.log(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    const bigPhotoData = event.currentTarget.dataset;

    setBigPhotoData({
      data: bigPhotoData?.img || '',
      alt: bigPhotoData?.alt || '',
    });
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery photosData={photosData} openModal={openModal} />
      <ImageModal
        onClose={onClose}
        isOpen={isOpen}
        bigPhotoData={bigPhotoData}
      />
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      {photosData.length === 0 || totalPages === page ? null : (
        <LoadMoreBtn loadMore={loadMore} />
      )}
    </div>
  );
}

export default App;
