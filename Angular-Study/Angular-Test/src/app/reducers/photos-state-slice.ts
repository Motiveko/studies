import { Photo } from 'src/app/models/photo';

export interface PhotosStateSlice {
  searchTerm: string;
  photos: Photo[];
  currentPhoto: Photo | null;
}
