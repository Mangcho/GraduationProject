const {Sequelize, DataTypes, Model} = require('sequelize');
 
class User extends Model {
    static init(sequelize){
        super.init(
            {
                id: {
                    type: DataTypes.STRING(40),
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isEmail: true,
                        len: [3,35]
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


}

module.exports = User;