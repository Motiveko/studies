import createPages from './pages.js';
import createRouter from './router.js';

const container = document.querySelector('main');
const pages = createPages(container);

const router = createRouter();

router
  .add('#/list', pages.list)
  .add('#/list/:id', pages.detail)
  .add('#/list/:id/:anotherId', pages.anotherDetail)
  .setNotFound(pages.notFound)
  .start();

const NAV_BUTTON_SELECTOR = 'button[data-navigate]';

document.body.addEventListener('click', (e) => {
  
  const { target } = e;
  if(target.matches(NAV_BUTTON_SELECTOR)) {
    const { navigate } = target.dataset;
    router.navigate(navigate);
  }
});

