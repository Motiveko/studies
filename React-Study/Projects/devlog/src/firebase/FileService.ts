import { getDownloadURL, getStorage, ref, StorageReference, uploadBytes, UploadResult } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';

type UploadFile = (path: string, file: Blob) => Promise<string>;
type UploadPostingImage = (file: Blob) => Promise<string>;
type CreateStorageRef = (path: string) => StorageReference;

/**
 * 게시글에 사용할 이미지 파일 업로드
 * @param file 업로드할 파일
 * @returns 다운로드 URL
 */
export const uploadImage: UploadPostingImage = (file: Blob) => {
  const path = `post/images/${uuidV4()}`;
  console.log(path);
  return uploadFile(path, file);
};

/**
 * 파일 업로드
 * @param path 파일 경로
 * @param file
 * @returns 다운로드 URL
 */
const uploadFile: UploadFile = async (path, file) => {
  const ref = createStorageRef(path);
  await uploadBytes(ref, file);
  return getDownloadURL(ref);
};

/**
 * cloud storag 의 파일에 대한 참조생성
 * @param path 파일 경로(+파일명)
 * @returns CreateStorageRef
 */
const createStorageRef: CreateStorageRef = path => {
  const storage = getStorage();
  return ref(storage, path);
};
