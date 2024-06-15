<template>
  <v-app>
    <v-main style="height: 100vh; display: flex; flex-direction: column;">
      <header>
        <v-toolbar>
          <v-toolbar-title class="font-bold" @click="navigateToHome">Restaurant Decider 👆</v-toolbar-title>
        </v-toolbar>
      </header>

      <v-container class="text-center">
        <div v-if="allCuisines.length > 1">
          <v-col col="12" style="margin-top: 35%">
            <v-btn color="primary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(0)">
              {{ allCuisines[0] }}
            </v-btn>
          </v-col>
          <div style="margin-top: 5%; font-size: 0.75rem">
            <h1>OR</h1>
          </div>
          <v-col cols="12" style="margin-top: 5%">
            <v-btn color="secondary" size="x-large" rounded="lg" elevation="20" @click="selectCuisine(1)">
              {{ allCuisines[1] }}
            </v-btn>
          </v-col>
        </div>
        <div v-else>
          <h1 @load="this.setCuisine();">You picked {{ allCuisines[0] }} cuisine!</h1>
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

            <v-col cols="12" v-for="restaurant in restaurants" :key="restaurant.place_id">
              <div>
                <h3>{{ restaurant.name }}</h3>
                <p>{{ restaurant.formattedAddress }}</p>
                <p>Google Maps: <a :href="restaurant.url">{{ restaurant.googleMapsUri }}</a></p>
              </div>
            </v-col>
          </v-row>

        </div>
      </v-container>

      <footer>
        <!-- Put ads here -->
      </footer>

    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

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
      apiKey: 'GOOGEL_API_KEY', // Replace with your actual API key
      location: '',
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
    },
    setZipCode() {
      this.searchRestaurants();
    },
    getUserLocation() {
      this.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = position.coords.latitude + ',' + position.coords.longitude;
        this.searchRestaurants();
      }, (error) => {
        console.error('Error getting location:', error);
        this.loading = false;
      });
    },
    setCuisine() {
      this.pickedCuisine = this.allCuisines[0];
    },
    async searchRestaurants() {
      this.loading = true;
      try {
        let query = `${this.pickedCuisine} restaurant`;

        if (this.zipCode.length === 5) {
          query += ` near ${this.zipCode}`;
        } else if (this.location) {
          query += ` near ${this.location}`;
        } else {
          throw new Error('Invalid zip code or location');
        }

        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=formatted_address,name,url&key=${this.apiKey}`);

        this.restaurants = response.data.candidates || [];
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        this.loading = false;
      }
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
