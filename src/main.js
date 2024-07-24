// main.js (or main.ts for TypeScript)
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import RestaurantDecider from './components/RestaurantDecider.vue';
import RestaurantRandom from './components/RestaurantRandom.vue';
import { Loader } from "@googlemaps/js-api-loader";
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Initialize Google Maps API loader
const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_PLACES_API_KEY, // Replace with your actual API key
  version: "weekly",
  libraries: ["places"] // Specify libraries if needed
});

// Vuetify configuration
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
});

// Define your routes
const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/decider', component: RestaurantDecider, name: 'RestaurantDecider' },
  { path: '/random', component: RestaurantRandom, name: 'RestaurantRandom' }
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Create the Vue app
const app = createApp(App);

// Use router and vuetify in the Vue app
app.use(router).use(vuetify);

// Attach the Google Maps API loader instance to the Vue app's global properties
app.config.globalProperties.$loader = loader;

// Mount the app
app.mount('#app');
