import counterView from './counter';

describe('counterView', () => {
	let targetElement: Element;
	beforeEach(() => {
		targetElement = document.createElement('div');
	});

	test('완료되지 않은 todo가 1개가 아니면 n Items left 출력', () => {
		const newCounter = counterView(targetElement, {
			currentFilter: '',
			todos: [
				{
					text: '1',
					completed: false
				},
				{
					text: '2',
					completed: false
				},
				{
					text: '3',
					completed: true
				}
			]
		});
		expect(newCounter.textContent).toBe('2 Items left');
	});
	test('완료되지 않은 todo가 1개면 n Item left 출력', () => {
		const newCounter = counterView(targetElement, {
			currentFilter: '',
			todos: [
				{
					text: '1',
					completed: false
				},
				{
					text: '2',
					completed: true
				}
			]
		});
		expect(newCounter.textContent).toBe('1 Item left');
	});
});
