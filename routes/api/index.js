const router = require('express').Router();

// http://localhost:9000/api/
router.get('/', (req, res) => {
  res.status(200).send('All is fine');
});

// http://localhost:9000/api/weather and some dynamic params
router.use('/weather', require('./weather'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
