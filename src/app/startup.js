import Vue from 'vue';
import VueRouter from 'vue-router';

import { load_base_components, list_non_base_components } from './component-loaders';

console.log('hello');

// console.log(test);

load_base_components();

const non_base_components = list_non_base_components();

// console.log(non_base);

const components = {};

for (const { name, config } of non_base_components) {
  components[name] = config;
}

Vue.use(VueRouter);

const routes = [
  { path: '/', component: components['login-form'] }
];

const router = new VueRouter({ routes });

export const vue = new Vue({
  el:   '#app',
  router
});
