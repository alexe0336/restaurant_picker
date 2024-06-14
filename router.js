// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import RestaurantDecider from '@/components/RestaurantDecider.vue';
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
      path: '/decider',
      name: 'RestaurantDecider',
      component: RestaurantDecider
    },
    {
      path: '/random',
      name: 'RestaurantRandom',
      component: RestaurantRandom
    }
  ]
});
