import React, { useEffect, useReducer } from 'react';
import store from '../../common/store';

import FriendList from '../components/FriendList'
import {getNextFriend} from '../../common/mockData'
import { addFriend } from '../state';

function FriendMain() {

  const [, forceUpdate] = useReducer(v => v+1, 0);

  useEffect(() => {
    let prevState = store.getState().friend;
    const unsubscribe = store.subscribe(() => {
      const state = store.getState().friend;
      if(prevState !== state) {
        forceUpdate();
        prevState = state;
      }
    });
    return () => unsubscribe();
  }, []);

  console.log('FriendMain Render');

  const friends = store.getState().friend.friends;
  function onAdd() {
    const newFriend = getNextFriend();
    store.dispatch(addFriend(newFriend));
  }
  return (
    <div>
      <button onClick={onAdd}>친구추가</button>
      <FriendList friends={friends} />
    </div>
  )
}

export default FriendMain;