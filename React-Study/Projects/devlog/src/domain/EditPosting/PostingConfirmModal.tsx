import React, {
  ChangeEvent,
  ChangeEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { Badge, Button, Form, Modal } from "react-bootstrap";
import ImageEditor from "../../components/ImageEditor";
import TransparentTextarea from "../../components/TransparentTextarea";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../components/Buttons/IconButton";
import { useCommon } from "../../context/CommonContext";
import { usePost } from "../../context/PostContext";

type props = {
  /** 모달창 노출 여부 */
  show: boolean;
  /** 모달창 노출 여부 setter */
  setShow: React.Dispatch<SetStateAction<boolean>>;
};

function PostingConfirmModal({ show, setShow }: props) {
  const { posting, mergePosting, uploadThumbnail, uploadPost } = usePost();
  const { localLoading, setLocalLoading } = useCommon();
  const descRef = useRef<HTMLTextAreaElement>(null);

  /** 썸네일 업로드 */
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!e.target?.files || e.target.files.length === 0) {
        throw new Error("업로드 할 파일을 찾지 못했습니다");
      }
      setLocalLoading(true);
      await uploadThumbnail(e.target.files[0]);
      setLocalLoading(false);
    },
    [setLocalLoading, uploadThumbnail]
  );

  /** 썸네일 제거 */
  const removeThumbnail = useCallback(
    () => mergePosting({ thumbnail: "" }),
    [mergePosting]
  );

  const tagInputRef = useRef<HTMLTextAreaElement>(null);

  /** 태그 제거 */
  const removeTag = useCallback(
    (index) =>
      mergePosting({ tags: posting.tags.filter((e, i) => i !== index) }),
    [mergePosting, posting.tags]
  );
  /**
   * 태그 추가. 엔터 입력시 현재까지 내용을 태그로 추가한다.
   */
  const onKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!tagInputRef.current) {
          throw new Error("태그 입력창에 문제가 발생하였습니다.");
        }
        const newTag = tagInputRef.current.value;
        mergePosting({ tags: [...posting.tags, newTag] });
        tagInputRef.current.value = "";
      }
    },
    [mergePosting, posting.tags]
  );

  /** 출간하기 */
  const uploadPosting = async () => {
    if (!confirm("작성한 내용으로 출간하시겠습니까?")) return;
    await uploadPost();
  };

  /** 설명에 띄어쓰기 금지시키기 */
  const prohibitEnter: KeyboardEventHandler = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  /**
   * 설명 변경
   */
  const onDescChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      mergePosting({ description: e.target.value });
    },
    [mergePosting]
  );

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>정보 입력하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex">
          <h6 className="me-auto">썸네일 등록</h6>
          {posting.thumbnail && (
            <IconButton icon={faTimes} onClick={removeThumbnail} />
          )}
        </div>
        <ImageEditor
          isLoading={localLoading}
          thumbnail={posting.thumbnail || ""}
          handleChange={handleFileChange}
          variant="thumbnail"
        />

        <h6 className="mt-2">포스트 설명</h6>
        <Form.Control
          as="textarea"
          onKeyPress={prohibitEnter}
          onChange={onDescChange}
          ref={descRef}
          style={{ resize: "none" }}
          value={posting.description}
        />

        <div className="d-flex mt-2 align-items-baseline">
          {posting.tags.map((tag, i) => (
            <Badge
              onClick={() => removeTag(i)}
              className="mx-1"
              pill
              bg="secondary"
              key={i}
            >
              {tag} &nbsp; X
            </Badge>
          ))}
          <TransparentTextarea
            placeholder="태그추가"
            style={tagStyle}
            ref={tagInputRef}
            onKeyPress={onKeyPress}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div
          className="d-flex justify-content-end mt-2"
          style={{ height: "4vh" }}
        >
          <Button size="sm" variant="dark" onClick={() => setShow(false)}>
            취소
          </Button>
          <Button
            className="ms-2"
            size="sm"
            variant="success"
            onClick={uploadPosting}
          >
            출간하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
const tagStyle = { fontWeight: "normal", fontSize: "1rem", color: "grey" };
export default React.memo(PostingConfirmModal);
