// server.js
// This file contains the server-side code for the Express server that will proxy requests to the Google Places API.
const express = require('express'); // Express web server framework
const axios = require('axios'); // Axios HTTP client
const path = require('path'); // Path module
const fs = require('fs'); // File system module

const app = express(); // Create Express app

require('dotenv').config(); //Loads environment variables from .env file

// Serve static files from the Vue app build directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/search-restaurants', async (req, res) => {
  try {
    const { query, limit } = req.query;
    const maxResults = parseInt(limit) || 3; // Default to 3 if limit is not provided
    const response = await axios.post('https://places.googleapis.com/v1/places:searchText',
      {
        textQuery: query,
        languageCode: "en",
        maxResultCount: maxResults // Add this line to limit the number of results
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.VUE_APP_GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.id'
        }
      }
    );

    // Extract only place_ids from the response
    const placeIds = response.data.places.slice(0, maxResults).map(place => ({ place_id: place.id }));

    // Save full response data to file
    fs.writeFile('response.json', JSON.stringify(response.data, null, 2), (err) => {
      if (err) {
        console.error('Error saving data to file:', err);
      } else {
        console.log('Full response data saved to response.json');
      }
    });

    // Send only the place_ids to the client
    res.json({ results: placeIds });
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Handle any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));