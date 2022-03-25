import React, { ChangeEvent, ChangeEventHandler, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { UI_CONST } from '../../constants';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../service/firebase/FileService';
import FileIconButton from '../../components/Buttons/FileIconButton';
import IconButton from '../../components/Buttons/IconButton';
import PostingConfirmModal from './PostingConfirmModal';
import TransparentTextarea from '../../components/TransparentTextarea';
import BackButton from '../../components/Buttons/BackButton';
import { usePost } from '../../context/PostContext';

function MarkdownEditor() {
  const { posting, mergePosting } = usePost();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [showModal, setShowModal] = useState(false);

  /**
   * 내용에 이미지 삽입
   * @param e ChangeEvent
   */
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async e => {
    e.preventDefault();
    if (!e.target?.files || e.target.files.length === 0) {
      throw new Error('업로드 할 파일을 찾지 못했습니다');
    }
    const downloadURL = await uploadImage(e.target.files[0]);
    _addImageRef(downloadURL);
  };

  /** 내용에 코드블럭 삽입 */
  const addCodeBlock = (e: MouseEvent) => {
    _insertText('```\n코드를입력해주세요\n```');
  };

  /** 작성중이던 포스팅이 있으면 해당 포스팅 내용으로 폼 */
  useEffect(() => {
    // 기존 작성하던 포스팅 있으면 초기화
    titleRef.current!.value = posting.title;
    contentRef.current!.value = posting.content;
    // setPosting(prev => ({ ...prev, content: posting.content }));
  }, [posting]);

  /** 마크다운 에디터의 현재 커서에 이미지 추가 */
  const _addImageRef = (imageUrl: string) => {
    _insertText(`![](${imageUrl})`);
  };

  /** 콘텐츠의 현재 커서 위치에 추가 내용 삽입 */
  const _insertText = (textToInsert: string) => {
    if (!contentRef.current) {
      throw new Error('textarea가 존재하지 않습니다');
    }

    const cursor = contentRef.current.selectionStart;
    const text = contentRef.current.value;
    const textBeforeCursor = text.substring(0, cursor);
    const textAfterCursor = text.substring(cursor, text.length);
    const changedContent = `${textBeforeCursor}\n${textToInsert}\n${textAfterCursor}`;
    contentRef.current.value = changedContent;

    mergePosting({ content: changedContent });
  };
  /** 제목 변경 */
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => mergePosting({ title: e.target.value }), []);

  /** 컨텐츠 변경 */
  const onChangeConent = useCallback((e: ChangeEvent<HTMLInputElement>) => mergePosting({ content: e.target.value }), []);

  const nextStep = useCallback(() => {
    if (!posting.content || !posting.title) {
      alert('게시물의 제목, 내용은 필수값입니다!');
      return;
    }
    setShowModal(true);
  }, [posting]);
  return (
    <div className="container" style={{ width: UI_CONST.EDITOR_WIDTH }}>
      <Form>
        <div className="d-flex mb-2" style={{ height: '2.5rem' }}>
          <TransparentTextarea placeholder="제목을 입력하세요" ref={titleRef} onChange={onChangeTitle} />
          <div className="ms-auto d-flex">
            <IconButton icon={faCode} onClick={addCodeBlock} />
            <FileIconButton onChange={handleFileChange} />
          </div>
        </div>

        <Form.Control
          onChange={onChangeConent}
          as="textarea"
          ref={contentRef}
          placeholder="내용을 입력하세요."
          style={{
            height: UI_CONST.EDITOR_HEIGHT,
            width: '100%',
            resize: 'none',
          }}
        />
        <div className="d-flex justify-content-end mt-2" style={{ height: '4vh' }}>
          <BackButton size="sm" variant="dark">
            취소
          </BackButton>

          <Button className="ms-2" onClick={nextStep} size="sm" variant="success">
            출간하기
          </Button>
        </div>
      </Form>
      <PostingConfirmModal show={showModal} setShow={setShowModal} />
    </div>
  );
}

export default React.memo(MarkdownEditor);
