import LandingPage from './pages/Landing.js';
import CreateBoardPage from './pages/CreateBoard.js';
import BoardViewPage from './pages/BoardView.js';
import MyBoardsPage from './pages/MyBoards.js';
import DeliverPage from './pages/Deliver.js';

const routes = {
  '/': LandingPage,
  '/create': CreateBoardPage,
  '/my-boards': MyBoardsPage,
  '/board/:id': BoardViewPage,
  '/board/:id/deliver': DeliverPage
};

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findRoute = (path) => {
  // Simple parameter matching for :id
  for (const route in routes) {
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length === pathParts.length) {
      const isMatch = routeParts.every((part, i) => part.startsWith(':') || part === pathParts[i]);
      if (isMatch) {
        const params = {};
        routeParts.forEach((part, i) => {
          if (part.startsWith(':')) {
            params[part.slice(1)] = pathParts[i];
          }
        });
        return { component: routes[route], params };
      }
    }
  }
  return { component: LandingPage, params: {} }; // Fallback
};

export const initRouter = () => {
  const router = () => {
    const path = parseLocation();
    const { component, params } = findRoute(path);
    
    const root = document.getElementById('page-content');
    root.innerHTML = ''; // Clear current content
    
    const page = document.createElement('div');
    page.className = 'page';
    component(page, params);
    root.appendChild(page);
    window.scrollTo(0, 0);
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  
  // Initial call if already loaded
  if (document.readyState === 'complete') {
    router();
  }
};

export const navigateTo = (path) => {
  window.location.hash = path;
};
