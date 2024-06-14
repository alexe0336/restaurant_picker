<template>
    <v-app>
      <v-main>
        <v-toolbar>
          <v-toolbar-title class="font-bold" @click="navigateToHome" >Restaurant Picker 👆</v-toolbar-title>
        </v-toolbar>
        <v-container class="text-center">
          <!-- Add your random cuisine logic here -->
          <h1>You randomly picked {{ randCuisine }}.</h1>
        </v-container>
        <v-container>
          <v-btn color="secondary" size="x-large" rounded="lg" elevation="20" @click="randomizeCuisine">
            Randomize Again
          </v-btn>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'RestaurantRandom',
    data() {
    return {
      allCuisines: ['American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Caribbean'],
      randCuisine: '',
    }
    },
    mounted() {
      this.randCuisine = this.allCuisines[Math.floor(Math.random() * this.allCuisines.length)];
    },
    methods: {
      navigateToHome() {
        this.$router.push({ name: 'HomePage' });
      },
      randomizeCuisine() {
        this.randCuisine = this.allCuisines[Math.floor(Math.random() * this.allCuisines.length)];
      }
    },
  };
  </script>
  
  <style scoped>
  .font-bold {
    font-weight: bold;
  }
  </style>
  