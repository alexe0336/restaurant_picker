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
          <div id="adsgoeshere" style="background: #1d1f29; padding-top:60px; text-align: center; width: 100%; min-height: 100px; min-width: 300px;" v-html="adsenseContent"></div>        </footer>
      </v-main>
    </v-app>
  </template>
  
<script>

export default {
  data() {
    return {
      adsenseContent: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.loadAdsense();
    });
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    navigateToHome() {
    this.$router.push({ name: 'HomePage' });
    },
    loadAdsense() {
      // Clear existing ads
      const existingAds = document.querySelectorAll('.adsbygoogle');
      existingAds.forEach(ad => ad.remove());

      const adScript = document.createElement('script');
      adScript.async = true;
      adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7786624977203533';
      adScript.crossOrigin = 'anonymous';
      document.head.appendChild(adScript);

      adScript.onload = () => {
        const adElement = document.createElement('ins');
        adElement.style.display = 'block';
        adElement.className = 'adsbygoogle';
        adElement.setAttribute('data-ad-client', 'ca-pub-7786624977203533');
        adElement.setAttribute('data-ad-slot', '2624040474');
        adElement.setAttribute('data-ad-format', 'auto');
        adElement.setAttribute('data-full-width-responsive', 'true');
        // Set explicit sizes
        adElement.style.width = '100%';
        adElement.style.height = '90px';  // Adjust as needed

        const adsContainer = document.getElementById('adsgoeshere');
        if (adsContainer) {
          adsContainer.innerHTML = ''; // Clear existing content
          adsContainer.appendChild(adElement);
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      };
    },
  },
};
</script>

<style scoped>
.v-btn {
  margin-top: 20px;
  padding: 20px 40px; /* Significantly increase padding */
  font-size: 24px; /* Increase font size for larger text */
  min-width: 150px; /* Increase minimum width */
  min-height: 70px; /* Increase minimum height */
}
.font-bold {
  font-weight: bold;
}
footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
}
</style>
  