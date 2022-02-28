import React, { useEffect, useReducer } from 'react';
import { getNextTimeline } from '../../common/mockData';
import store
 from '../../common/store';
import TimelineList from '../components/TimelineList';
import { addTimeline } from '../state';
function TimelineMain() {
  const [, forceUpdate] = useReducer(v => v+1, 0);
  
  useEffect(() => {
    // 상태 변경시 useReducer 상태 업데이트해 강제 랜더링 발생시킨다.(리덕스는 컴포넌트 state/props가 아니라서 변경해도 랜더링 다시 안됨)
    let prevState = store.getState().timeline;
    const unsubscribe = store.subscribe(() => {
      const state = store.getState().timeline;
      if(prevState !== state) {
        forceUpdate()
        prevState = state;
      }
    });
    return () => unsubscribe();
  }, []);

  function onAdd() {
    const timeline = getNextTimeline();
    store.dispatch(addTimeline(timeline));
  }

  console.log('TimelineMain render');
  const timelines = store.getState().timeline.timelines;

  return (
    <div>
      <button onClick={onAdd}>타임라인 추가</button>
      <TimelineList timelines={timelines} />
    </div>
  )

}

export default TimelineMain;