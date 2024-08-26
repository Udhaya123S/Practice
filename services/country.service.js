
const { Country } = require('../models');
const { Op } = require('sequelize'); 


const createCountry = async (countryData) => {
  console.log('Country model:', Country); 
  return await Country.create(countryData);
};

const getCountries = async (page, limit, searchQuery, statusFilter) => {
  const offset = (page - 1) * limit;

  
  const whereClause = {
    ...(searchQuery && { name: { [Op.iLike]: `%${searchQuery}%` } }),
    ...(statusFilter && { status: statusFilter }) 
  };

  const { count, rows } = await Country.findAndCountAll({
    where: whereClause,
    limit,
    offset,
  });

  return { count, rows };
};

const getCountryById = async (id) => {
  return await Country.findByPk(id);
};

const updateCountryById = async (id, data) => {
  return await Country.update(data, { where: { id } });
};

const deleteCountryById= async (id) => {
  return await Country.destroy({ where: { id } });
};

module.exports = {
  createCountry,
  getCountries,
  getCountryById,
  updateCountryById,
  deleteCountryById,
};
