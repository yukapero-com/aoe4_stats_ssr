const appRoot = require('app-root-path');
const {Model, DataTypes} = require('sequelize');
const sequelize = require(appRoot + '/api/lib/sequelize.js');

class ChartImageForShare extends Model {}

ChartImageForShare.init({
  rlUserId: {
    type: DataTypes.STRING(255),
    primaryKey: true,
  },
  chartImageBase64: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  sequelize,
  modelName: 'chart_image_for_share',
  freezeTableName: true,
  underscored: true,
  timestamps: true,
});

ChartImageForShare.sync({alter: true});

module.exports = ChartImageForShare;
