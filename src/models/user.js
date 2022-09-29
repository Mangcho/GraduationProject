const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isEmail: true,
                        len: [3, 35]
                    }
                },
                password: {
                    type: DataTypes.STRING(64),
                    allowNull: false,
                    validate: {
                        len: [64]
                    }
                },
                whitelist_imei: {
                    type: DataTypes.STRING(10),
                    allowNull: false,

                },
                name: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    validate: {
                        len: [0, 20]
                    }
                },
                age: {
                    type: DataTypes.NUMBER(3).UNSIGNED,
                    allowNull: false,
                    validate: {
                        len: [0, 3]
                    }
                }
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'user', // We need to choose the model name
                timestamps: true,
                updatedAt: true,
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        )
    }

    static associate(db) {
        db.user.belongsTo(db.whitelist, { foreignKey: 'whitelist_imei', targetKey: 'imei', onDelete: 'cascade', onUpdate: 'cascade' });
    }


}

module.exports = User;