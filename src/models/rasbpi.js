const { Sequelize, DataTypes, Model } = require('sequelize');

class Rasbpi extends Model { // Not finished
    static init(sequelize) {
        super.init(
            {
                whitelist_imei: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isAlphanumeric: true,
                        len: [10]
                    }
                },
                timestamp: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
                raw: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                result: {
                    type: DataTypes.JSON,
                    allowNull: false,
                }
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'rasbpies', // We need to choose the model name
                timestamps: true,
                updatedAt: true,
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            });
    }

    static associate(db) {
        db.data.belongsTo(db.whitelist, { foreignKey: 'whitelist_imei', targetKey: 'imei', onDelete: 'cascade', onUpdate: 'cascade' });

    }


}

module.exports = Rasbpi;