import React from 'react';
import { useParams } from 'react-router-dom';
import Profile from '../../components/Profile';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';

function UserPage() {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [user] = useUser(id);
  alert('개발중..');
  return (
    <div className="container d-flex flex-column">
      <div>{currentUser?.displayName} 의 페이지</div>
      {user && <Profile user={user} />}
    </div>
  );
}
export default React.memo(UserPage);
