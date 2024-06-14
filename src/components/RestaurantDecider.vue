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
            <h1>You picked {{ allCuisines[0] }} cuisine!</h1>
            setCuisine();
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
                {
                  "textQuery": "{} Food in Sydney, Australia",
                  "pageSize": 3
                }
              </v-col>
              <v-col cols="12">
                //second restaurant
              </v-col>
              <v-col cols="12">
                //third restaurant
              </v-col>
            </v-row>

          </div>
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
      this.zipcode = this.zipCode;
    },
    getUserLocation() {
      this.loading = true;
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = position.coords.latitude + ',' + position.coords.longitude;
        this.loading = false;
      });
    },
    setCuisine() {
      this.pickedCuisine = this.allCuisines[0];
    },
    constructApiUrl(pickedCuisine, zipcode) {
      return `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${pickedCuisine}+restaurant+near+${zipcode}&key=YOUR_API_KEY`;
    },
    searchRestaurants() {
      if (this.zipcode.length > 0) {
        const apiUrl = this.constructApiUrl(this.allCuisines[0], this.zipcode);
        axios.get(apiUrl)
          .then(response => {
            this.restaurants = response.data.results.slice(0, 3); // Limit to 3 restaurants
          })
          .catch(error => {
            console.error('Error fetching restaurants:', error);
          });
      } else {
        this.restaurants = [];
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
