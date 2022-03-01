import React from 'react';

import FriendList from '../components/FriendList'
import {getNextFriend} from '../../common/mockData'
import { addFriend, setAgeLimit, setShowLimit } from '../state';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from '../common';
import NumberSelect from '../components/NumberSelect';

function FriendMain() {
  const {friends, ageLimit, showLimit} = useSelector(state => {
    const {friends, ageLimit, showLimit} = state.friend
    const filterdFriends = friends.filter(friend => friend.age <= ageLimit);
    return {friends: filterdFriends.splice(0, showLimit), ageLimit, showLimit};
  }, shallowEqual);

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
      <NumberSelect value={ageLimit} options={AGE_LIMIT_OPTIONS} onChange={(ageLimit) => dispatch(setAgeLimit(ageLimit))} postfix=" 세 이하만 보기" />
      <NumberSelect value={showLimit} options={SHOW_LIMIT_OPTIONS} onChange={(showLimit) => dispatch(setShowLimit( showLimit ))} postfix=" 명 이하만 보기(연령 제한 적용)"/>
    </div>
  )
}
const AGE_LIMIT_OPTIONS = [15, 20, 25, MAX_AGE_LIMIT];
const SHOW_LIMIT_OPTIONS = [2, 4, 6, MAX_SHOW_LIMIT];
export default FriendMain;
