<template>
  <v-app>
    <v-main style="height: 100vh; display: flex; flex-direction: column;">
      <!-- Header -->
      <header>
        <v-toolbar>
          <v-toolbar-title class="font-bold" @click="navigateToHome">Restaurant Decider 👆</v-toolbar-title>
        </v-toolbar>
      </header>

      <!-- Main Content -->
      <body>
        <v-container class="text-center">
          <div v-if="allCuisines.length > 1">
            <!-- Buttons for selecting cuisine -->
            <v-col col="12" style="margin-top: 35%">
              <v-btn class ="cuisinseSelectButton" color="primary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(0)">
                {{ allCuisines[0] }}
              </v-btn>
            </v-col>
            <div style="margin-top: 5%; font-size: 0.75rem">
              <h1>OR</h1>
            </div>
            <v-col cols="12" style="margin-top: 5%">
              <v-btn class ="cuisinseSelectButton" color="secondary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(1)">
                {{ allCuisines[1] }}
              </v-btn>
            </v-col>
          </div>
          <div v-else>
            <!-- Display picked cuisine and search options -->
            <h1>You picked {{ allCuisines[0] }} cuisine!</h1>
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

            <!-- Display nearby restaurants -->
            <v-row style="margin-top: 10px">
              <v-col cols="12">
                <div>
                  <h1>Restaurants Nearby</h1>
                </div>
              </v-col>
              <!-- For loop to display google maps Places Overview web app snippets -->
              <v-col cols="12" v-for="placeId in placeIds" :key="placeId">
                <div v-if="placeId" class="restaurant-overview">
                  <gmpx-api-loader :key="place-overview-loader" solution-channel="GMP_GCC_placeoverview_v1_m">
                    <gmpx-place-overview :place="placeId" size="medium">
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
          </div>
        </v-container>
      </body>
      

      <!-- Footer -->
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
  data() {
    return {
      allCuisines: ['American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Thai', 'Korean', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Caribbean'],
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
  methods: {
    selectCuisine(index) {
      const selected = this.allCuisines[index];
      this.allCuisines.splice(0, 2);
      this.allCuisines.unshift(selected);
    },
    navigateToHome() {
      this.$router.push({ name: 'HomePage' });
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
        let query = `${this.allCuisines[0]} restaurant`;
  
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
.cuisinseSelectButton {
  margin-top: 20px;
  padding: 20px 40px; /* Significantly increase padding */
  font-size: 24px; /* Increase font size for larger text */
  min-width: 150px; /* Increase minimum width */
  min-height: 70px; /* Increase minimum height */
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