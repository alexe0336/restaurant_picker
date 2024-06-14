<template>
  <v-app>
    <v-main style="height: 100vh; display: flex; flex-direction: column;">
      <header>
        <v-toolbar>
          <v-toolbar-title class="font-bold" @click="navigateToHome" >Restaurant Decider 👆</v-toolbar-title>
        </v-toolbar>
      </header>

      <body>
        <v-container class="text-center">
          <h1>You randomly picked {{ randCuisine }} cuisine!</h1>
          <v-container>
            <v-btn color="secondary" size="x-large" rounded="lg" elevation="20" @click="randomizeCuisine">
              Randomize Again
            </v-btn>
          </v-container>
          <div style="margin-top: 20px;">
            Enter Zip code to display nearby restaurants
          </div>
          <v-form @submit.prevent="setZipCode" style="margin-top: 20px">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="zipCode"
                  maxlength="5"
                  :rules="[rules.maxLength]"
                  label="Zip Code"
                  placeholder="12345"
                  type="text"
                ></v-text-field>
                <v-btn
                  :loading="loading"
                  class="mt-2"
                  text="Submit"
                  type="submit"
                  block
                ></v-btn>
              </v-col>
              <v-col cols="12" class="text-center">
                <div style="margin-top: 10px;">
                  Or use location
                </div>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  @click="getUserLocation"
                  block
                >
                  Use Location
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
            
          <v-row style="margin-top: 10px">
            <v-col cols="12">
              <div>
                <h1>
                  Restaurants Nearby
                </h1>
              </div>
            </v-col>

            <v-col cols="12">
              //first restaurant
            </v-col>
            <v-col cols="12">
              //second restaurant
            </v-col>
            <v-col cols="12">
              //third restaurant
            </v-col>
          </v-row>

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
    name: 'RestaurantRandom',
    data() {
    return {
      allCuisines: ['American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Caribbean'],
      randCuisine: '',
      zipCode: '',
      rules: {
        maxLength: value => (value && value.length === 5) || 'Zip Code must be 5 characters',
      },
      loading: false,
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
      },
      setZipCode() {
      this.zipcode = this.zipCode;
      },
      getUserLocation() {
        this.loading = true;
        navigator.geolocation.getCurrentPosition((position) => {
          this.location = position.coords.latitude + ',' + position.coords.longitude;
          this.loading = false;
        });
      }
    },
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
  