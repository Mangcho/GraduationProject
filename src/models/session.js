import { Sequelize, DataTypes, Model } from 'sequelize';

export default class Session extends Model { // Not finished
    static init(sequelize) {
        super.init(
            {
                sid: {
                    type: DataTypes.STRING,
                    primaryKey: true,
                },
                expires: {
                    type: DataTypes.DATE,
                },
                data: {
                    type: DataTypes.TEXT,
                },
            },
            {
                sequelize, // We need to pass the connection instance
                modelName: 'sessions', // We need to choose the model name
                //timestamps: true,
                //createdAt: true,
                //updatedAt: true,
                //paranoid: true, // deletedAt
                charset: 'utf8',
                collate: 'utf8_general_ci'
            });
    }
}
