import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

import App from './App.vue';
import Main from './components/Main.vue'
import Directory from './components/Directory.vue';

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Home'
  },
  {
    path: '/directory',
    component: Directory,
    name: 'Directory'
  }
];

const router = new Router({
  mode: 'history',
  routes
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

