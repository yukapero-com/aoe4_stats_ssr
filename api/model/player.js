const appRoot = require('app-root-path');
const {Model, DataTypes} = require('sequelize');
const sequelize = require(appRoot + '/api/lib/sequelize.js');

class Player extends Model {}

Player.init({
  rlUserId: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'player',
  freezeTableName: true,
  underscored: true,
  // timestamps: true,
});

Player.sync({alter: true});

module.exports = Player;
