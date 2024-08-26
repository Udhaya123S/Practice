const User = require('./user.model');
const PhoneNumber = require('./phoneNumber.model');
const Comment = require('./comment.model');

// Define associations

// hasone
User.hasOne(PhoneNumber, { foreignKey: 'userId', as: 'phoneNumber' });
PhoneNumber.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// hasmany

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });  
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// many to many

// User.belongsToMany(Comment, { through: 'User', foreignKey: 'userId', as: 'Comment' });
// Comment.belongsToMany(User, { through: 'User', foreignKey: 'commentId', as: 'users' });

module.exports = { User, PhoneNumber ,Comment};
