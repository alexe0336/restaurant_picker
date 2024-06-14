import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import RestaurantPicker from './components/RestaurantPicker.vue';
import RestaurantRandom from './components/RestaurantRandom.vue';

// Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Define your routes
const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/picker', component: RestaurantPicker, name: 'RestaurantPicker' },
  { path: '/random', component: RestaurantRandom, name: 'RestaurantRandom' }
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Create the Vue app and use the router and vuetify
createApp(App).use(router).use(vuetify).mount('#app');
