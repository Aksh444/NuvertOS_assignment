const Sequelize = require('sequelize');
const sequelize = require('../../config/config.js');

const Compound = sequelize.define('Compound', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'CompoundName',
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'CompounrDescription',
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    field: 'strImageSource',
  },
  imageAttribution: {
    type: Sequelize.STRING,
    allowNull: true,
    field: 'strImageAttribution',
  },
  dateModified: {
    type: Sequelize.DATE,
    allowNull: true,
    field: 'dateModified',
  },
}, {
  tableName: 'Compounds',
  timestamps: true,
});

module.exports = Compound;