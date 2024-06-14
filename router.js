// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import RestaurantPicker from '@/components/RestaurantPicker.vue';
import RestaurantRandom from '@/components/RestaurantRandom.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/picker',
      name: 'RestaurantPicker',
      component: RestaurantPicker
    },
    {
      path: '/random',
      name: 'RestaurantRandom',
      component: RestaurantRandom
    }
  ]
});
