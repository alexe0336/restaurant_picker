<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title class="font-bold" @click="navigateToHome" >Restaurant Picker 👆</v-toolbar-title>
      </v-toolbar>
      <v-container class="text-center">
        <div v-if="allCuisines.length > 1">
          <v-col>
            <v-btn color="primary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(0)">
              {{ allCuisines[0] }}
            </v-btn>
          </v-col>
          <v-col>
            <h1 class="OR-text">OR</h1>
          </v-col>
          <v-col>
            <v-btn color="primary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(1)">
              {{ allCuisines[1] }}
            </v-btn>
          </v-col>
        </div>
        <div v-else>
          <h1>You picked {{ allCuisines[0] }}!</h1>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      allCuisines: ['American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Caribbean'],
    };
  },
  methods: {
    selectCuisine(index) {
      // Add the selected cuisine to the front of the array
      const selected = this.allCuisines[index];
      this.allCuisines.splice(0, 2);
      this.allCuisines.unshift(selected);
    },
    navigateToHome() {
      this.$router.push({ name: 'HomePage' });
    }
  }
};
</script>

<style scoped>
.OR-text{
  font-size: 1.5em;
}
.font-bold {
  font-weight: bold;
}
</style>
