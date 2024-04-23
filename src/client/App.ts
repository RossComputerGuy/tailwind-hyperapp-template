import View404 from './views/404'

const routes = {
  '404': View404,
};

export default state => (routes[state.url.pathname] ?? routes["404"])(state);
