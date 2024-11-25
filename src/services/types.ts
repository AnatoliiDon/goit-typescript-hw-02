export interface PhotoData {
  id: string;
  urls: { small: string; full: string };
  alt_description: string;
}

export interface BigPhotoData {
  data?: string;
  alt?: string;
}

export interface FetchPhotosResponse {
  results: PhotoData[];
  total_pages: number;
  total: number;
}
