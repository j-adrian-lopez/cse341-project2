const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Home']
  res.send('Welcome to the Employees API Home Page');
});
router.use('/employees', require('./employees'));

module.exports = router;
