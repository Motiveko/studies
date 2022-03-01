import React from 'react';

import FriendList from '../components/FriendList'
import {getNextFriend} from '../../common/mockData'
import { addFriend } from '../state';
import { useSelector, useDispatch } from 'react-redux';

function FriendMain() {
  const friends = useSelector(state => state.friend.friends);
  const dispatch = useDispatch();
  console.log('FriendMain Render');

  function onAdd() {
    const newFriend = getNextFriend();
    dispatch(addFriend(newFriend));
  }
  
  return (
    <div>
      <button onClick={onAdd}>친구추가</button>
      <FriendList friends={friends} />
    </div>
  )
}

export default FriendMain;