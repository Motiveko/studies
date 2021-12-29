import createRouter from './router';

jest.useFakeTimers(); // 네이티브 타이머를 Jest 타이머로 대체

describe('routerTest', () => {
  let router;

  beforeEach(() => {
    router = createRouter();
  })
  afterEach(() => {
    jest.clearAllTimers();
  })
  
  test('router add, checkRoute 동작 테스트', () => {
    // given
    const id = "foo";
    const pw = "123";
    const urlformat = '/foo/bar/:id/:pw';
    const component = jest.fn();
    const url = `/foo/bar/${id}/${pw}`;    
    
    // when
    router
    .add(urlformat, component)
    .start();
    
    // window.location.pathname = url; -> 안먹는다.
    window.history.pushState(null, null, url);
    jest.advanceTimersByTime(250);

    // then
    expect(component).toHaveBeenCalledWith({ "id": id, "pw" : pw });
  })

  test('router.navigate()로 존재하지 않는 url 접근시 notFound 호출', () => {
    const url = '/foo/bar/1/3';
    
    const notFound = jest.fn();
    
    router
      .setNotFound(notFound)
      .start();
    
    router.navigate(url);

    jest.advanceTimersByTime(250);
    
    expect(notFound).toHaveBeenCalledTimes(2); 
  })
})