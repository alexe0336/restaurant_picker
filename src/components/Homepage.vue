<template>
    <v-app>
      <v-main>
        <v-toolbar>
          <v-toolbar-title class="font-bold" @click="navigateToHome">Restaurant Picker 👆</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-center">
          <v-col>
            <v-btn color="primary" size="x-large" rounded="lg" elevation="20" @click="navigateTo('RestaurantPicker')">
              Pick
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="secondary" size="x-large" rounded="lg" elevation="20" @click="navigateTo('RestaurantRandom')">
              Random
            </v-btn>
          </v-col>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(routeName) {
        this.$router.push({ name: routeName });
      },
      navigateToHome() {
      this.$router.push({ name: 'HomePage' });
    }
    }
  };
  </script>
  
  <style scoped>
  .font-bold {
    font-weight: bold;
  }
  </style>
  