<template>
    <v-app>
      <v-main style="height: 100vh; display: flex; flex-direction: column;">
        <header>
          <v-toolbar>
            <v-toolbar-title class="font-bold" @click="navigateToHome">Restaurant Decider 👆</v-toolbar-title>
          </v-toolbar>
        </header>

        <body>
          <v-container class="text-center">
            <v-col cols="12" style="margin-top: 35%">
              <v-btn color="primary" size="x-large" rounded="lg" elevation="20" @click="navigateTo('RestaurantDecider')">
                Decide
              </v-btn>
            </v-col>
            <div style="margin-top: 5%; font-size: 0.75rem">
              <h1>OR</h1>
            </div>
            <v-col cols="12" style="margin-top: 5%">
              <v-btn color="secondary" size="x-large" rounded="lg" elevation="20" @click="navigateTo('RestaurantRandom')">
                Random
              </v-btn>
            </v-col>
          </v-container>
        </body>
        <footer>
          //Put ads here
        </footer>
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
  footer {
    margin-top: auto;
    text-align: center;
    padding: 10px;
  }
  </style>
  