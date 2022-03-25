import { SetStateAction, useCallback, useState } from "react";
import { uploadImage } from "../service/firebase/FileService";

type Upload = (file: Blob) => Promise<void>;
type UseThumbnail = (initialThumbnail: string | null) => [
  {
    thumbnail: string | null;
    setThumbnail: React.Dispatch<SetStateAction<string | null>>;
  },
  Upload
];

export const useThumbnail: UseThumbnail = (initialThumbnail) => {
  const [thumbnail, setThumbnail] = useState<string | null>(initialThumbnail);

  const upload: Upload = useCallback(async (file) => {
    const downloadURL = await uploadImage(file);
    setThumbnail(downloadURL);
  }, []);
  // return { {thumbnail, setThumbnail}, upload };
  return [{ thumbnail, setThumbnail }, upload];
};
