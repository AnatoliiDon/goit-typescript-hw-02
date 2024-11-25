import React from 'react';

interface LoadMoreBtnProps {
  loadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
