import React, { useEffect } from 'react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommon } from '../context/CommonContext';
import { usePost } from '../context/PostContext';

import MarkdownEditor from '../domain/EditPosting/MarkdownEditor';
import MarkdownPreview from '../domain/EditPosting/MarkdownPreview';
import { getPosting } from '../service/firebase/PostingService';

export default function EditPost() {
  const { posting, initPosting, mergePosting } = usePost();
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
    <>
      <div className="d-flex align-items-stretch">
        <MarkdownEditor />
        <MarkdownPreview />
      </div>
    </>
  );
}
