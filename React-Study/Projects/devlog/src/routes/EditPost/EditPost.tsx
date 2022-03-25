import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommon } from "../../context/CommonContext";
import { usePost } from "../../context/PostContext";

import MarkdownEditor from "./MarkdownEditor";
import MarkdownPreview from "./MarkdownPreview";
import { getPosting } from "../../service/firebase/PostingService";

export default function EditPost() {
  const { initPosting, mergePosting } = usePost();
  const { id } = useParams();
  const { setGlobalLoading } = useCommon();
  useEffect(() => {
    if (!id) {
      // id없으면 posting 초기화
      initPosting();
      return;
    }
    // 수정시(id존재) 글 가져오기
    async function fetchPosting(id: string) {
      setGlobalLoading(true);
      const oldPosting = await getPosting(id);
      mergePosting(oldPosting);
      setGlobalLoading(false);
    }
    fetchPosting(id);
  }, [id, setGlobalLoading, mergePosting, initPosting]);

  return (
    <div className="d-flex align-items-stretch">
      <MarkdownEditor />
      <MarkdownPreview />
    </div>
  );
}
