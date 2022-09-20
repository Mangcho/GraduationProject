const {Sequelize, DataTypes, Model} = require('sequelize');
 
class Whitelist extends Model {
    static init(sequelize){
        super.init(
            {
                imei: {
                    type: DataTypes.STRING(10),
                    allowNull: false,
                    primaryKey: true
                }
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'Whitelist', // We need to choose the model name
                timestamps: true,
                updatedAt: false,
                paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        )
    }


}

module.exports = Whitelist;