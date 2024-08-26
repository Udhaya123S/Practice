const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1'); 
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const sequelize = require('./config/db.config');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());

// Enable gzip compression
app.use(compression());

// Parse cookies
app.use(cookieParser());

// Enable CORS
const corsConfig = {
  origin: config.corsOrigin,
  credentials: true,
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

// Sync database
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => console.log('Error syncing database:', err));

// Language setting middleware
app.use((req, res, next) => {
  const langCode = req.acceptsLanguages('en', 'ar');
  req.languageCode = langCode ? langCode : 'en';
  next();
});

// JWT authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Content Security Policy
app.use((req, res, next) => {
  res.set(
    'Content-Security-Policy',
    "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
  );
  next();
});

// API routes
app.use('/v1', routes);

// Handle 404 errors
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert errors to ApiError
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

module.exports = app;
