const router = require('express').Router();
const https = require('https');

const coordsList = [
  { lat: 35.5, lon: 78.5 }, // Some Place
  { lat: 50.63022092883518, lon: 3.0597929062754594 }, // Lille
  { lat: 40.518360, lon: -3.825185 }, // Madrid
  { lat: 41.912541, lon: 12.508524 }, // Rome
  { lat: 51.506646, lon: -0.103871 }, // London
  { lat: 40.724997, lon: -73.990566 }, // New York
  { lat: 35.689249, lon: 139.76238 }, // Tokyo
  { lat: -34.628235, lon: -58.447033 }, // Buenos Aires
];

function toQueryString(query) {
  return Object.keys(query).reduce((qs, key, currentIndex) => `${qs}${key}=${query[key]}${currentIndex !== Object.keys(query).length - 1 ? '&' : ''}`, '?');
}

function getCurrentDefaultForeCasts() {
  return Promise.all(
    coordsList.map((coords, i) => new Promise((resolve, reject) => {
      try {
        const options = {
          hostname: 'weatherbit-v1-mashape.p.rapidapi.com',
          path: `/current${toQueryString(coords)}`,
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '1d75847856msha3c8730bcadede3p1de86bjsn6162510198bc',
            'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
          },
        };

        https.request(options, (response) => {
          let data = '';

          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            resolve(JSON.parse(data)); // JSON response
          });
        }).on('error', (err) => {
          console.error(`[ERROR] getForeCasts ${i} - err: `, err);
          reject(err);
        }).end();
      } catch (error) {
        reject(error);
      }
    })),
  );
}

// http://localhost:9000/api/weather/forecasts
router.get('/', (req, res) => {
  getCurrentDefaultForeCasts()
    .then((response) => {
      console.log('[SUCCESS] http://localhost:9000/api/weather/forecasts - response: ', response);
      return res.status(200).send(response);
    }, (error) => res.status(500).send(error));
});

module.exports = router;
