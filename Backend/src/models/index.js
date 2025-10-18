const sequelize = require('../../config/config.js');
const Compound = require('./compound.models.js');
const User = require('./user.models.js');

(async () => {
  try {
    // Non-destructive: creates missing tables, won’t drop/alter existing ones
    await sequelize.sync({ force: false, alter: false });
    console.log('Models synced');
  } catch (err) {
    console.error('Sequelize sync error:', err.message);
  }
})();

module.exports = { sequelize, Compound, User };
