import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from '@mui/material';
import React, { CSSProperties } from 'react';
import { COMMON_CONSTANT } from '../constants/CommonConstant';
import { User } from '../service/firebase/UserService';
import { getRandomProfile } from '../utils/random-util';
import CustomHR from './CustomHR';

type props = {
  user: User;
  style?: CSSProperties;
};
/**
 * 큰 프로필
 */
function Profile({ user, style }: props) {
  return (
    <div className="d-flex flex-column mt-5 w-100" style={style}>
      <div className="d-flex pt-5 mb-4 align-items-center">
        <Avatar src={user.photoURL || getRandomProfile()} sx={{ width: '4.5rem', height: '4.5rem' }} />
        <div className="d-flex ms-5 flex-column" style={{ width: '30%' }}>
          <h4 className="">{user.displayName}</h4>
          <div className="text-muted text-truncate" style={userDescriptionStyle} dangerouslySetInnerHTML={{ __html: user.description || '' }}></div>
        </div>
      </div>
      <CustomHR />
      <div>
        {user.gitURL && (
          <FontAwesomeIcon
            icon={faGithub as IconDefinition}
            style={{ color: 'grey', width: '2.5rem', height: '2.5rem', cursor: 'pointer' }}
            onClick={() => window.open(`${COMMON_CONSTANT.GIT_PREFIX}/${user.gitURL}`, '_blank')}
          />
        )}
        <FontAwesomeIcon icon={faEnvelope} className="ms-4" style={{ color: 'grey', width: '2.5rem', height: '2.5rem', cursor: 'pointer' }} />
      </div>
    </div>
  );
}

const userDescriptionStyle: CSSProperties = {
  whiteSpace: 'pre-line',
  // 3줄까지 표시 후 truncate
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};
export default React.memo(Profile);
