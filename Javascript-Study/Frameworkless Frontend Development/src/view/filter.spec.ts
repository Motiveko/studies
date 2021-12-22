import filtersView from './filter';

const TEMPLATE = `<ul class="filters">
    <li>
        <a href="#">All</a>
    </li>
    <li>
        <a href="#/active">Active</a>
    </li>
    <li>
        <a href="#/completed">Completed</a>
    </li>
</ul>`;

fdescribe('filter 테스트', () => {
	let targetElement: Element;
	beforeEach(() => {
		const tempElement = document.createElement('div');
		tempElement.innerHTML = TEMPLATE;
		// targetElement = tempElement.childNodes[0];
		targetElement = tempElement.querySelector('ul') as HTMLUListElement;
	});

	test('currentFilter에 설정된 요소에는 selected class가 추가되어야 한다.', () => {
		const newCounter = filtersView(targetElement, {
			currentFilter: 'All',
			todos: []
		});
		const selectedItem = newCounter.querySelector('li a.selected');
		expect(selectedItem?.textContent).toBe('All');
	});
});
