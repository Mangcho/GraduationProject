import { Sequelize, DataTypes, Model } from 'sequelize';

export default class Rasbpi extends Model { // Not finished
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                whitelist_imei: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    validate: {
                        isAlphanumeric: true,
                        len: [10]
                    }
                },
                raw: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
                result: {
                    type: DataTypes.JSON,
                    allowNull: true,
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'rasbpies', // We need to choose the model name
                timestamps: true,
                createdAt: true,
                updatedAt: true,
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            });
    }
    static associate(db) {
        db.data.belongsTo(db.whitelist, { foreignKey: 'whitelist_imei', targetKey: 'imei', onDelete: 'delete', onUpdate: 'cascade' });

    }
}
