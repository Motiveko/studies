import { Avatar } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../service/firebase/UserService';
import './SmallProfile.css';
type Prop = {
  user: User;
  /** 단위: rem */
  imageSize?: number;
};
function SmallProfile({ user, imageSize = 1 }: Prop) {
  const { photoURL, displayName, email, uid } = user;
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center profile"
      style={{ cursor: 'pointer' }}
      onClick={e => {
        e.stopPropagation();
        navigate(`/${uid}`);
      }}
    >
      {photoURL && <Avatar src={photoURL} className="me-2" style={{ width: `${imageSize}rem`, height: `${imageSize}rem` }} />}
      <div>{displayName || email.substring(0, email.indexOf('@'))}</div>
    </div>
  );
}

export default React.memo(SmallProfile);
