import { NextFunction, Request, Response, Router } from 'express';
import https from 'https';
import {forecastRouter} from "./forecasts";

export const weatherRouter = Router();

// http://localhost:9000/api/weather and some dynamic params
weatherRouter.use('/forecasts', forecastRouter);

// Preload user profile on routes with ':paramName',
// see: https://github.com/gothinkster/node-express-realworld-example-app/blob/master/routes/api/profiles.js

// run anytime a request containing dynamic segment paramName is called
weatherRouter.param('paramName', (req: Request, res: Response, next: NextFunction, paramName) => {
  // console.log('paramName - ', paramName);
  req.paramName = paramName;
  return next();
});

// and etc ...
weatherRouter.param('secondParam', (req, res, next, secondParam) => {
  // console.log('secondParam - ', secondParam);
  req.secondParam = secondParam;
  return next();
});

// http://localhost:9000/api/weather
weatherRouter.get('/', (req, res) => {
  console.log(req.query);
  return res.send(req.query);
});

function toQueryString(query) {
  return Object.keys(query).reduce((qs, key, currentIndex) => `${qs}${key}=${query[key]}${currentIndex !== Object.keys(query).length - 1 ? '&' : ''}`, '?');
}

// http://localhost:9000/api/weather/get
weatherRouter.get('/get', (req, res) => {
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
weatherRouter.get('/:paramName', (req, res) => {
  console.log(req.params);
  console.log(req.query);
  return res.send(req.paramName);
});

// http://localhost:9000/api/weather/[:paramName]/[:secondParam]
weatherRouter.get('/:paramName/:secondParam', (req, res) => {
  console.log(req.params);
  return res.json(req.params);
});

// TODO See for regular expression containing params
