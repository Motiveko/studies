import { createStore, combineReducers } from 'redux'
import timelineReducer, {
  addTimeline,
  removeTimeline,
  editTimeline,
  increaseNextPage
} from './timeline/state';
import friendReducer, {
  addFriend,
  removeFriend,
  editFriend
} from './friend/state';

const reducer = combineReducers({
  timeline: timelineReducer,
  friend: friendReducer,
});

// const reducer = friendReducer

const store = createStore(reducer);
store.subscribe(() =>  {
  // 리듀서 동작 후에 출력된다.
  const state = store.getState();
  console.log(state);
});


store.dispatch(addTimeline({ id: 1, desc: '내용1'}));
store.dispatch(addTimeline({ id: 2, desc: '내용2'}));
store.dispatch(increaseNextPage());
store.dispatch(editTimeline({ id: 1, desc: '내용1수정'}));
store.dispatch(removeTimeline({ id: 2, desc: '내용2'}));

store.dispatch(addFriend({id: 1, name: '친구1'}))
store.dispatch(addFriend({id: 2, name: '친구2'}))
store.dispatch(removeFriend({id: 1, name: '친구1'}))
store.dispatch(editFriend({id: 1, name: '친구2수정'}));

