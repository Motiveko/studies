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

  test.only('router.navigate()로 존재하지 않는 fragment 전달시 notFound 호출', () => {
    const fragment = '#/foo/bar/:id/:pw';
    
    const component = jest.fn();
    router.start();
    router.setNotFound(component);
    
    // TODO :: window에 추가한 event handler가 동작하지 않는것 같다. 이건 아마 우리의 잘못은 아닌거같은데 jsdom 동작을 살펴봐야할듯
    router.navigate(fragment);
    
    expect(component).toHaveBeenCalled();
  })
})