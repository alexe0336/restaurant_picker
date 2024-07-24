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
            <!-- For loop to display google maps Places Overview web app snippets -->
            <v-col cols="12" v-for="placeId in placeIds" :key="placeId">
              <div v-if="placeId" class="restaurant-overview">
                <gmpx-api-loader :key="place-overview-loader" solution-channel="GMP_GCC_placeoverview_v1_l">
                  <gmpx-place-overview :place="placeId" size="large">
                  </gmpx-place-overview>
                </gmpx-api-loader>
                <!-- Button to take user to PlaceID's google webpage -->
                <v-btn
                  color="#4285F4"
                  dark              
                  class="google-btn"
                  @click="goToGoogleWebPage(placeId)"
                >
                  Google Page
                </v-btn>
              </div>
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
import axios from 'axios';
import '@googlemaps/extended-component-library/place_overview.js';
import '@googlemaps/extended-component-library/api_loader.js';

export default {
  name: 'RestaurantRandom',
  data() {
    return {
      allCuisines: ['American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Caribbean'],
      randCuisine: '',
      zipCode: '',
      pickedCuisine: '',
      rules: {
        maxLength: value => (value && value.length === 5) || 'Zip Code must be 5 characters',
      },
      loading: false,
      restaurants: [],
      location: '',
      placeIds: [],
      numberOfRestaurants: 5, // Changing this variables changes the amount of restaurants displayed.
    };
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
      this.searchRestaurants();
    },
    getUserLocation() {
      this.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = `${position.coords.latitude},${position.coords.longitude}`;
        this.zipCode = ''; // Clears zip code to ensure that location/coordinates are used.
        this.searchRestaurants();
      }, (error) => {
        console.error('Error getting location:', error);
        this.loading = false;
      });
    },
    async searchRestaurants() {
      this.loading = true;
      try {
        let query = `${this.randCuisine} restaurant`;
  
        if (this.zipCode.length === 5) {
          query += ` near:${this.zipCode}`;
        } else if (this.location) {
          query += ` near:${this.location}`;
        } else {
          throw new Error('Invalid zip code or location');
        }
  
        const response = await axios.get('/api/search-restaurants', {
          params: {
            query: query,
            fields: 'place_id',
            limit: this.numberOfRestaurants,
          }
        });
        
        this.placeIds = response.data.results.slice(0, this.numberOfRestaurants).map(result => result.place_id);

      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        this.loading = false;
      }
    },
    goToGoogleWebPage(placeId) {
      window.open(`https://www.google.com/maps/place/?q=place_id:${placeId}`);
    },
  },
};
</script>
  
<style scoped>
.font-bold {
  font-weight: bold;
}
.container {
  width: 360px;
}
footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
}
.restaurant-overview {
  margin-bottom: 20px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.google-btn {
  text-transform: none !important;
}
</style>
  