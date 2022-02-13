import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React from 'react';
import { COMMON_CONSTANT } from '../constants/CommonConstant';
import { User } from '../service/firebase/UserService';
import { getRandomProfile } from '../utils/random-util';

type Prop = {
  user: User;
};
/**
 * 큰 프로필
 */
function Profile({ user }: Prop) {
  return (
    <>
      <div className="d-flex mt-5 pt-5 mb-5 align-items-center">
        <Avatar src={user.photoURL || getRandomProfile()} sx={{ width: '4.5rem', height: '4.5rem' }} />
        <h4 className="ms-5">{user.displayName}</h4>
      </div>
      <hr />
      {user.gitURL && (
        <FontAwesomeIcon
          icon={faGithub as IconDefinition}
          style={{ color: 'grey', width: '2.5rem', height: '2.5rem', cursor: 'pointer' }}
          onClick={() => window.open(`${COMMON_CONSTANT.GIT_PREFIX}/${user.gitURL}`, '_blank')}
        />
      )}
      <FontAwesomeIcon icon={faEnvelope} className="ms-4" style={{ color: 'grey', width: '2.5rem', height: '2.5rem', cursor: 'pointer' }} />
    </>
  );
}
export default React.memo(Profile);
