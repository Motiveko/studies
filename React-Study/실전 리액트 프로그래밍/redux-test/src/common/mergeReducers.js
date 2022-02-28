// 같은 도메인의 리듀서 합치기
export default function mergeReducers(reducers) {
  return function (state, action) {
    if(!state) {
      // 인자로 상태값이 없다 => 각 리듀서에서 초기값 모두 합쳐서 반환
      return reducers.reduce((acc, r) => ({...acc, ...r(state, action)}), {});
    } else {
      // 인자로 상태값 있다 => 전체 리듀서 돌려서 상태값 변환시켜본다.(같은 액션에 대한 핸들러 있을경우 연달아 호출될것이다.)
      let nextState = state;
      for(const r of reducers) {
        nextState = r(nextState, action);
      }
      return nextState;
    }
  }
}