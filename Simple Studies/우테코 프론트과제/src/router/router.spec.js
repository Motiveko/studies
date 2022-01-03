import routerFactory from './router';

describe('router test', () => {
  let router;
  let routerOutlet;
  beforeEach(() => {
    routerOutlet = document.createElement('div');
    router = routerFactory(routerOutlet);
    window.history.replaceState(null, null, '/');
  });

  test('navigate 호출시 올바른 component 생성 함수를 호출한다.', () => {
    const component = jest.fn(() => document.createElement('span'));
    router.add('/url', component).start();
    router.navigate('/url');
    expect(component).toHaveBeenCalled();
  });

  test('routerFactory에 routerOutlet이 이상한 값이면 Error', () => {
    expect(() => routerFactory({ foo: 'bar' })).toThrow();
  });

  test('router에 등록되지 않은곳을 navigate하면 Error', () => {
    router.add('/url', () => {}).start();
    expect(() => router.navigate('/foo')).toThrow();
  });
});
