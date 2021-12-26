import todosView from './todos';

let targetElement: Element;

describe('filtersView', () => {
  beforeEach(() => {
    const todoListTemplate = document.createElement('template');
    todoListTemplate.id = 'todo-item';
    todoListTemplate.innerHTML = `
      <li>
        <div class="view">
          <input type="checkbox" class="toggle">
          <label></label>
          <button class="destroy"></button>
        </div>
        <input class="edit">
      </li>
    `;
    document.querySelector('body')?.appendChild(todoListTemplate);
    targetElement = document.createElement('ul');
  });

  test('모든 todo에 대해 li요소를 만든다 ', () => {
    const newTodoList = todosView(
      targetElement,
      {
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
      },
      {}
    );
    expect(newTodoList.querySelectorAll('li').length).toBe(3);
  });

  test('todo에 적절한 attribute가 설정되어야 한다.', () => {
    const newTodoList = todosView(
      targetElement,
      {
        currentFilter: '',
        todos: [
          {
            text: 'First',
            completed: true
          },
          {
            text: 'Second',
            completed: false
          }
        ]
      },
      {}
    );

    const [firstItem, secondItem] = newTodoList.querySelectorAll('li');

    expect(firstItem.classList.contains('completed')).toBe(true);
    expect((firstItem.querySelector('.toggle') as HTMLInputElement).checked).toBe(true);
    expect(firstItem.querySelector('label')?.textContent).toBe('First');
    expect((firstItem.querySelector('.edit') as HTMLInputElement).value).toBe('First');

    expect(secondItem.classList.contains('completed')).toBe(false);
    expect((secondItem.querySelector('.toggle') as HTMLInputElement).checked).toBe(false);
    expect(secondItem.querySelector('label')?.textContent).toBe('Second');
    expect((secondItem.querySelector('.edit') as HTMLInputElement).value).toBe('Second');
  });
});
