const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;  // :id => id
const URL_FRAGMENT_REGEXP = '([^\\/]+)'; // '\','/'이 아닌 문자열

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


  // hashChange 이벤트 핸들러
  const checkRoutes = () => {
    const { hash }= window.location;
    const route = routes.find(
      ({ testRegExp }) => testRegExp.test(hash)
    );
    
    // 라우터 레지스트리에 매치되는 컴포넌트 없음
    if(!route) {
      notFound();
      return;
    }
  
    const params = extractUrlParams(route, hash);
    
    const { component } = route;
    component(params)
  }
  router.add = (fragment, component) => {

    const paramNames = [];
    const testRegExpStr = fragment.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
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

  router.navigate = (fragment) => {
    window.location.hash = fragment;
  }

  router.start = () => {
    window.addEventListener('hashchange', checkRoutes);

    if(!window.location.hash) {
      window.location.hash = '#/'
    }

    checkRoutes();
  }

  return router;
}