const router = require('express').Router();

router.use('/api', require('./api'));

router.use('/', function(err, req, res, next){

});

module.exports = router;