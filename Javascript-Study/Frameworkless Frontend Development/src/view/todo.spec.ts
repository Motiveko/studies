import todosView from './todos';

let targetElement: Element | undefined;

describe('filtersView', () => {
  beforeEach(() => {
    targetElement = document.createElement('ul');
  });

  test('모든 todo에 대해 li요소를 만든다 ', () => {
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

  test('');
});
