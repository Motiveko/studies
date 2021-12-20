import todosView from './todos';

let targetElement: Element | undefined;

describe('filtersView', () => {
  beforeEach(() => {
    targetElement = document.createElement('ul');
  });

  it('모든 todo에 대해 li요소를 만든다 ', () => {
    if (!targetElement) {
      throw new Error('targetElement가 생성되지 않았습니다');
    }
    const newTodoList = todosView(targetElement, {
      currentFilter: '',
      todos: [
        {
          text: 'First',
          completed: true
        },
        {
          text: 'Second',
          completed: true
        },
        {
          text: 'Third',
          completed: false
        }
      ]
    });
    expect(newTodoList.querySelectorAll('li').length).toBe(3);
  });
});

// describe('테스트입니다', () => {
//   let v: string | undefined;
//   v = '잘동작한니';
//   v = '진짜?';
//   console.log('잘 작동하나요???');
//   it('테스트유', () => {
//     expect(1).toBe(1);
//   });
// });
