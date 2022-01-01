import { EVENTS } from "./Application";
import List from "./List"


describe('List', () => {
  let list: List;
  beforeEach(() => {
    customElements.define('todomvc-list', List);
    document.body.innerHTML = `<todomvc-list></todomvc-list>`;
    list = document.querySelector('todomvc-list') as List;
  })

  test('unsubscribe should called when component destroyed', () => {
    jest.spyOn(list, 'unsubscribe');
    document.body.innerHTML = '';
    expect(list.unsubscribe).toHaveBeenCalled();
  })

  test('DELETE_ITEM distpatch test', () => {
    list._updateList({todos: [{text: 'text', completed: true}], currentFilter: 'All'})
    let detail: string = '';
    list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
      detail = (e as CustomEvent).detail.index
    })

    const destroyBtn = list.querySelector('button.destroy') as HTMLButtonElement;
    destroyBtn.click();

    expect(detail).toBe('0');
  })
})