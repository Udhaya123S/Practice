const Joi = require('joi');
const { body } = require('express-validator');

const countryValidationRules = () => [
  body('countryName').notEmpty().withMessage('Country name cannot be empty'),
  body('countryCode')
    .isLength({ min: 2, max: 3 })
    .withMessage('Country code must be between 2 and 3 characters long'),
  body('statusCode').isInt().withMessage('Status code must be an integer'),
];

module.exports = {
  countryValidationRules,
};


const createCountrySchema = Joi.object({
  countryName: Joi.string().required().messages({
    'string.empty': 'Country name is required',
  }),
  countryCode: Joi.string().min(2).max(3).required().messages({
    'string.empty': 'Country code is required',
    'string.min': 'Country code must be at least 2 characters long',
    'string.max': 'Country code must be at most 3 characters long',
  }),
});

const updateCountrySchema = Joi.object({
  countryName: Joi.string(),
  countryCode: Joi.string().min(2).max(3),
});

module.exports = {
  createCountrySchema,
  updateCountrySchema,
};
