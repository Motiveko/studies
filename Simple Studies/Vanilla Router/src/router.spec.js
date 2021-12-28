import createRouter from './router';

describe('routerTest', () => {
  let router;

  beforeEach(() => {
    router = createRouter();
  })
  
  test('router add, checkRoute 동작 테스트', () => {
    // given
    const id = "foo";
    const pw = "123";
    const fragment = '#/foo/bar/:id/:pw';
    const component = jest.fn();
    const url = `#/foo/bar/${id}/${pw}`;    
    window.location.hash = url;
    
    // when
    router.add(fragment, component);
    router.start();

    // then
    expect(component).toHaveBeenCalledWith({ "id": id, "pw" : pw });
  })

  test('router.navigate()로 존재하지 않는 fragment 전달시 notFound 호출', () => {
    const fragment = '#/foo/bar/:id/:pw';
    
    const notFound = jest.fn();
    
    router
      .setNotFound(notFound)
      .start();
    
    router.navigate(fragment);
    // jsdom 은 이벤트를 자동으로 dispatch 해주지 않는다. 수동으로 해줘야함
    window.dispatchEvent(new Event('hashchange'))
    
    expect(notFound).toHaveBeenCalledTimes(2); 
  })
})