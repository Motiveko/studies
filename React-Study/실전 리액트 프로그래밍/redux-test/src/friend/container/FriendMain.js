import React, { useMemo } from 'react';

import FriendList from '../components/FriendList'
import {getNextFriend} from '../../common/mockData'
import { addFriend } from '../state/state';
import { useSelector, useDispatch } from 'react-redux';
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from '../common';

import { makeGetFriendsWithAgeLimit } from '../state/selector'
function FriendMain({ ageLimit }) {
  
  const getFriendsWithAgeLimit = useMemo(makeGetFriendsWithAgeLimit, [])
  const friends = useSelector(state => getFriendsWithAgeLimit(state, ageLimit));
  
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
      {/* <NumberSelect value={ageLimit} options={AGE_LIMIT_OPTIONS} onChange={(ageLimit) => dispatch(setAgeLimit(ageLimit))} postfix=" 세 이하만 보기" />
      <NumberSelect value={showLimit} options={SHOW_LIMIT_OPTIONS} onChange={(showLimit) => dispatch(setShowLimit( showLimit ))} postfix=" 명 이하만 보기(연령 제한 적용)"/> */}
    </div>
  )
}
const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT];
export default FriendMain;
