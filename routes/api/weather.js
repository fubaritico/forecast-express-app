const router = require('express').Router();

// Preload user profile on routes with ':paramName',
// see: https://github.com/gothinkster/node-express-realworld-example-app/blob/master/routes/api/profiles.js

// run anytime a request containing dynamic segment paramName is called
router.param('paramName', function(req, res, next, paramName){
    console.log('paramName - ', paramName)
    req.paramName = paramName;
    return next();
});

// and etc ...
router.param('secondParam', function(req, res, next, secondParam){
    console.log('secondParam - ', secondParam)
    req.secondParam = secondParam;
    return next();
});

// http://localhost:9000/api/weather/[:paramName]
router.get('/:paramName', function(req, res, next){
    console.log(req.params)
    return res.send(req.paramName);
});

// http://localhost:9000/api/weather/[:paramName]/[:secondParam]
router.get('/:paramName/:secondParam', function(req, res, next){
    console.log(req.params)
    return res.json(req.params);
});

// TODO See for regular expression containing params

module.exports = router;