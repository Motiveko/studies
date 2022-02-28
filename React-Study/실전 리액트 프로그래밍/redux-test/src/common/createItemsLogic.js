import createReducer from "./createReducer";

// 리듀서, 액션 생성간의 공통 로직 분리
export default function createItemsLogic(name) {
  
  const ADD = `${name}/ADD`;
  const REMOVE =`${name}/REMOVE`;
  const EDIT =`${name}/EDIT`;

  const add = item => ({ type: ADD, item });
  const remove = item => ({ type: REMOVE, item });
  const edit = item => ({ type: EDIT, item });


  const reducer = createReducer({ [name]: [] }, {
    [ADD]: (state, action) => state[name].push(action.item),
    [REMOVE]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      if(index >= 0) state[name].splice(index, 1);
    },
    [EDIT]: (state, action) => {
      const index = state[name].findIndex(item => item.id === action.item.id);
      if(index >= 0) {
        state[name][index] = action.item;
      }
    }
  })

  return { add, remove, edit, reducer };
}