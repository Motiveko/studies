const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;  // :id => id
const URL_FRAGMENT_REGEXP = '([^\\/]+)'; // '\','/'이 아닌 문자열
const TICKTIME = 250;

const extractUrlParams = (route, url) => {
  const params = {};

  const { paramNames, testRegExp } = route;
  if (paramNames.length === 0) {
    return params
  }
  const matches = url.match(testRegExp);
  
  matches.shift();

  matches.forEach((param, i) => {
    const paramName = paramNames[i];
    params[paramName] = param
  });

  return params;
}

export default () => {

  const routes = [];
  let notFound = () => {
    console.log('#####Default Not Found#####');
  };
  const router = {};

  let lastUrl = '';
  // hashChange 이벤트 핸들러
  const checkRoutes = () => {
    const { pathname }= window.location;
  
    
    if(lastUrl === pathname) {
      return;
    }

    lastUrl = pathname;

    const route = routes.find(
      ({ testRegExp }) => testRegExp.test(pathname)
    );
    
    // 라우터 레지스트리에 매치되는 컴포넌트 없음
    if(!route) {
      notFound();
      return;
    }
  
    const params = extractUrlParams(route, pathname);
    console.log(params)
    const { component } = route;
    component(params)
  }
  router.add = (url, component) => {

    const paramNames = [];
    const testRegExpStr = url.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
      paramNames.push(paramName); 
      return URL_FRAGMENT_REGEXP;
    })
    .replace(/\//, '\\/'); // / 를 \/로 치환
    const testRegExp = new RegExp(`^${testRegExpStr}$`);

    routes.push({
      testRegExp,
      component,
      paramNames
    });
    return router;  // 메서드 체이닝을 위한
  }

  router.setNotFound = cb => {
    notFound = cb;
    return router;
  }

  router.navigate = (url) => {
    window.history.pushState(null, null, url)
  }

  router.start = () => {
    setInterval(checkRoutes, TICKTIME);
    checkRoutes();

    const NAV_A_SELECTOR = 'a[data-navigation]';

    document.body.addEventListener('click', (e) => {

      const { target } = e;
      if(target.matches(NAV_A_SELECTOR)) {
        e.preventDefault();
        router.navigate(target.href);
      }
    });
    return router;
  }

  return router;
}