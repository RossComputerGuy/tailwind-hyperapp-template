import { h, text } from 'hyperapp'

export default (state) => h('div', {}, [
  h('h1', {}, text('Page not found')),
  h('p', {}, text(`The requested page (${state.url.pathname}) could not be found.`)),
]);
