const router = require('express').Router();
const https = require('https');

// http://localhost:9000/api/weather and some dynamic params
router.use('/forecasts', require('./forecasts'));

// Preload user profile on routes with ':paramName',
// see: https://github.com/gothinkster/node-express-realworld-example-app/blob/master/routes/api/profiles.js

// run anytime a request containing dynamic segment paramName is called
router.param('paramName', (req, res, next, paramName) => {
  // console.log('paramName - ', paramName);
  req.paramName = paramName;
  return next();
});

// and etc ...
router.param('secondParam', (req, res, next, secondParam) => {
  // console.log('secondParam - ', secondParam);
  req.secondParam = secondParam;
  return next();
});

// http://localhost:9000/api/weather
router.get('/', (req, res) => {
  console.log(req.query);
  return res.send(req.query);
});

function toQueryString(query) {
  return Object.keys(query).reduce((qs, key, currentIndex) => `${qs}${key}=${query[key]}${currentIndex !== Object.keys(query).length - 1 ? '&' : ''}`, '?');
}

// http://localhost:9000/api/weather/get
router.get('/get', (req, res) => {
  const { query } = req;
  // console.log('[http://localhost:9000/api/weather/get] - req: ', req);
  const options = {
    hostname: 'weatherbit-v1-mashape.p.rapidapi.com',
    path: `/forecast/3hourly${toQueryString(query)}`,
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

    response.on('end', () => res.send(data));
  }).on('error', (err) => {
    console.error('Error: ', err);
    return res.status(500).send(err);
  }).end();
});

// http://localhost:9000/api/weather/[:paramName]
router.get('/:paramName', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  return res.send(req.paramName);
});

// http://localhost:9000/api/weather/[:paramName]/[:secondParam]
router.get('/:paramName/:secondParam', (req, res) => {
  console.log(req.params);
  return res.json(req.params);
});

// TODO See for regular expression containing params

module.exports = router;
