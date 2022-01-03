export default routerOutlet => {
  if (!routerOutlet || !routerOutlet.appendChild) {
    throw new Error('routerOutlet 값이 잘못되었습니다.');
  }
  const routes = [];
  const router = {};
  const outlet = routerOutlet;

  const checkRoutes = () => {
    const { pathname } = window.location;
    if (pathname === '/') {
      return;
    }
    const currentRoute = routes.find(route => route.url === pathname);
    if (!currentRoute) {
      throw new Error('router에 등록되지 않는 url입니다.');
    }

    outlet.innerHTML = '';
    outlet.appendChild(currentRoute.component());
  };

  router.add = (url, component) => {
    routes.push({ url, component });
    return router;
  };

  router.navigate = url => {
    window.history.pushState(null, null, url);
    checkRoutes();
  };

  router.start = () => {
    checkRoutes();
    return router;
  };

  return router;
};
