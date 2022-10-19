import { Sequelize, DataTypes, Model } from 'sequelize';

export default class Whitelist extends Model {
    static init(sequelize) {
        super.init(
            {
                imei: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isAlphanumeric: true,
                        len: [10]
                    }
                }
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'whitelist', // We need to choose the model name
                timestamps: true,
                updatedAt: true,
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            });
    }

    static associate(db) {
        db.whitelist.hasMany(db.data, { foreignKey: 'whitelist_imei', sourceKey: 'imei', onDelete: 'cascade', onUpdate: 'cascade' });
        db.whitelist.hasOne(db.user, { foreignKey: 'whitelist_imei', sourceKey: 'imei', onDelete: 'cascade', onUpdate: 'cascade' })
    }


}
