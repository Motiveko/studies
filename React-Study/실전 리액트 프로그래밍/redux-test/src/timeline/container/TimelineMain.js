import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getNextTimeline } from '../../common/mockData';

import TimelineList from '../components/TimelineList';
import { addTimeline, increaseNextPage } from '../state';
function TimelineMain() {
  const [timelines, nextPage] = useSelector(state => [state.timeline.timelines, state.timeline.nextPage], shallowEqual);
  const dispatch = useDispatch();

  function onAdd() {
    const timeline = getNextTimeline();
    dispatch(addTimeline(timeline));
  }
  function onNextPage() {
    dispatch(increaseNextPage());
  }

  console.log('TimelineMain render');

  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <button onClick={onNextPage}>다음페이지</button>
      nextPage : {nextPage}
      <TimelineList timelines={timelines} />
    </div>
  )
}

export default TimelineMain;