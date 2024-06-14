<template>
    <v-app>
      <v-main>
        <v-toolbar>
          <v-toolbar-title class="font-bold">Random Cuisine</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-center">
          <!-- Add your random cuisine logic here -->
          <h1>This is the Restaurant Random page.</h1>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'RestaurantRandom',
  };
  </script>
  
  <style scoped>
  .font-bold {
    font-weight: bold;
  }
  </style>
  