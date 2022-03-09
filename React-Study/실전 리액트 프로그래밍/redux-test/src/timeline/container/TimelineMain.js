import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getNextTimeline } from '../../common/mockData';

import TimelineList from '../components/TimelineList';
import { actions } from '../state/index';
function TimelineMain() {
  const [timelines, nextPage, isLoading] = useSelector(state => [state.timeline.timelines, state.timeline.nextPage, state.timeline.isLoading], shallowEqual);
  const error = useSelector(state => state.timeline.error);
  const text = useSelector(state => state.timeline.text);
  const [currentText, setCurrentText] = useState('')

  const dispatch = useDispatch();

  function onAdd() {
    const timeline = getNextTimeline();
    dispatch(actions.addTimeline(timeline));
  }
  function onNextPage() {
    dispatch(actions.increaseNextPage());
  }
  function onLike(e) {
    // dispatch(actions.setLoading());
    const id = Number(e.target.dataset.id);
    const timeline = timelines.find(t => t.id === id);
    dispatch(actions.requestLike(timeline));
  }
  function onChangeText(e) {
    const text = e.target.value;
    setCurrentText(text);
    dispatch(actions.trySetText(text));
  }
  console.log('TimelineMain render');
  
  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <button onClick={onNextPage}>다음페이지</button>
      nextPage : {nextPage}
      <TimelineList timelines={timelines} onLike={onLike}/>
      {isLoading && '로딩중....'}
      {!!error && <p>에러 발생: {error}</p>}

      <input type="text" value={currentText} onChange={onChangeText} />
      {text && <p>{text}</p>}
    </div>
  )
}

export default TimelineMain;