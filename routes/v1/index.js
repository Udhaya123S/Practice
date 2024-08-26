const express = require('express'); 
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const countryRoute= require('./country.route');
const stateRoute= require('./state.route');
const phoneRoute= require('./phoneNumber.route');
const commentRoute= require('./comment.route');

const router = express.Router();

const defaultRoutes = [
 
  {
    path: '/users',
    route: userRoute,
  },

  {
     path: '/state',
     route: stateRoute,
  },
  {
    path: '/country',
    route: countryRoute,
  },
  {
    path: '/number',
    route: phoneRoute,
  },
  {
    path: '/comment',
    route:commentRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
