import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import BackButton from '../components/Buttons/BackButton';
import InlineFormControl from '../components/InlineFormControl';
import ImageEditor from '../components/ImageEditor';
import { useAuth } from '../context/AuthContext';
import { updateUser, User } from '../service/firebase/UserService';
import { useThumbnail } from '../hooks/useThumbnail';
import { MyError } from '../core/MyError';
import { useCommon } from '../context/CommonContext';
import AlertSnackbar from '../components/Snackbars/AlertSnackbar';
import { COMMON_CONSTANT } from '../constants/CommonConstant';

export default function UserSettings() {
  const { currentUser, refreshUser } = useAuth() as ReturnType<typeof useAuth> & { currentUser: User };
  const { localLoading, setLocalLoading, setGlobalLoading, error, setError } = useCommon();

  const [{ thumbnail, setThumbnail }, upload] = useThumbnail(currentUser?.photoURL);

  const nameRef = useRef<HTMLInputElement>(null);
  const gitRef = useRef<HTMLInputElement>(null);

  const { uid, email, displayName, gitURL } = currentUser as User;

  const handleThumbnailChange: ChangeEventHandler<HTMLInputElement> = async e => {
    e.preventDefault();
    setLocalLoading(true);
    if (!e.target?.files || e.target.files.length === 0) {
      throw new Error('업로드 할 파일을 찾지 못했습니다');
    }
    await upload(e.target.files[0]);
    setLocalLoading(false);
  };

  const removeThumbnail = () => {
    setThumbnail('');
  };

  useEffect(() => {
    if (!nameRef?.current || !gitRef?.current) {
      throw new Error('프로필 수정 로드중 문제가 발생했습니다.');
    }
    nameRef.current.value = displayName || '';
    gitRef.current.value = gitURL || '';
  }, [displayName, gitURL]);

  const [success, setSuccess] = useState('');
  const onSubmit = async () => {
    setGlobalLoading(true);
    try {
      const partialUser = _parseForm();
      console.log(partialUser);
      await updateUser(partialUser);
      await refreshUser();
      setSuccess('프로필을 수정하였습니다.');
    } catch (e) {
      console.error(e);
      setError('회원정보 수정중 오류가 발생했습니다.');
    }
  };

  const _parseForm = () => {
    if (!nameRef.current || !gitRef.current) {
      throw new MyError('폼 정보 파싱중 오류가 발생했습니다.');
    }
    return {
      uid,
      photoURL: thumbnail,
      displayName: nameRef.current.value,
      gitURL: gitRef.current.value,
    };
  };

  return (
    <>
      <Card style={{ width: '40vw', maxWidth: '520px', minWidth: '400px' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center' }}>회원정보 수정</Card.Title>
          <InlineFormControl label="프로필">
            <ImageEditor thumbnail={thumbnail || ''} variant="avatar" isLoading={localLoading} onRemove={removeThumbnail} handleChange={handleThumbnailChange} />
          </InlineFormControl>
          <InlineFormControl label="이메일">
            <Form.Control type="text" className="htmlForm-control-plaintext" id="staticEmail" value={email} readOnly />
          </InlineFormControl>
          <InlineFormControl label="이름">
            <Form.Control type="text" className="htmlForm-control" id="inputName" ref={nameRef} />
          </InlineFormControl>
          <InlineFormControl label="깃 주소" prefix={COMMON_CONSTANT.GIT_PREFIX}>
            <Form.Control type="text" className="htmlForm-control" id="inputGithub" ref={gitRef} />
          </InlineFormControl>
          <BackButton variant="secondary" className="w-100">
            취소
          </BackButton>
          <Button onClick={onSubmit} className="w-100 mt-3" variant="success">
            수정하기
          </Button>
        </Card.Body>
      </Card>
      {error && <AlertSnackbar type="error" message={error} onClose={() => setError('')} />}
      {success && <AlertSnackbar type="success" message={success} onClose={() => setError('')} />}
    </>
  );
}
