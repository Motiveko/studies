import React, {
  useCallback, useContext, useMemo, useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../service/firebase/FileService";
import { Posting, uploadPosting } from "../service/firebase/PostingService";
import useAuth from "../store/auth/useAuth";
import { useCommon } from "./CommonContext";

type props = {
  children: React.ReactNode;
};
export type PartialPosting = Omit<Posting, "createdAt" | "updatedAt">;
type PostContext = {
  posting: PartialPosting;
  // 포스팅
  mergePosting: (partialPosting: Partial<PartialPosting>) => void;
  uploadThumbnail: (file: Blob) => Promise<void>;
  initPosting: () => void;
  uploadPost: () => void;
  updatePosting?: () => void;
};
const PostContext = React.createContext<PostContext | undefined>(undefined);

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost는 PostContextProvider 내에서 호출되어야 합니다.");
  }
  return context;
};
export default function PostProvider({ children }: props) {
  const [posting, setPosting] = useState(emptyPosting);
  const { setGlobalLoading } = useCommon();
  const navigate = useNavigate();
  const mergePosting = useCallback(
    (partialPosting: Partial<PartialPosting>) => {
      setPosting((prev) => ({ ...prev, ...partialPosting }));
    },
    [],
  );

  const initPosting = useCallback(() => {
    setPosting(emptyPosting);
  }, []);

  const { user } = useAuth();
  const uploadPost = useMemo(() => async () => {
    setGlobalLoading(true);
    if (!user) {
      throw new Error("로그인 한 상태가 아닙니다.");
    }
    const result = await uploadPosting({ ...posting, userId: user.uid });
    alert("포스트를 출간하였습니다.");
    setGlobalLoading(false);
    navigate(`/post/${result.uid}`);
  }, [user, navigate, posting, setGlobalLoading]);
  const uploadThumbnail = async (file: Blob) => {
    const downloadURL = await uploadImage(file);
    setPosting((prev) => ({ ...prev, thumbnail: downloadURL }));
  };
  const value = useMemo(() => ({
    posting,
    initPosting,
    mergePosting,
    uploadThumbnail,
    uploadPost,
  }), [initPosting, mergePosting, posting, uploadPost]);
  return (
    <PostContext.Provider
      value={value}
    >
      {children}
    </PostContext.Provider>
  );
}

const emptyPosting: PartialPosting = {
  uid: "",
  userId: "",
  title: "",
  content: "",
  thumbnail: "",
  description: "",
  tags: [],
};
