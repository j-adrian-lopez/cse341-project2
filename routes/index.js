const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

router.use('/employees', require('./employees'));

router.use('/login', passport.authenticate('github'), (req, res) => {});

router.use('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
