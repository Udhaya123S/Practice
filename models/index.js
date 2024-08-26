
module.exports.Country= require('./country.model');
module.exports.State= require('./state.model');
//module.exports.PhoneNumber= require('./phoneNumber.model');
const { User, PhoneNumber ,Comment} = require('./associations');
module.exports.User = User;
module.exports.PhoneNumber = PhoneNumber;
module.exports.Comment =Comment;