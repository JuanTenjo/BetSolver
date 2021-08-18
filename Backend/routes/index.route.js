const router = require('express').Router();
const AuthRoutes = require('./auth.route');
const UserRoutes = require('./user.route');
const LeagueRoutes = require('./league.route');
const TeamRoutes = require('./team.route');
const CountryRoutes = require('./country.route');


router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/league', LeagueRoutes);
router.use('/team', TeamRoutes);
router.use('/country', CountryRoutes);

module.exports = router;