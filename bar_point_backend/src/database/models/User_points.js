module.exports = (sequelize, dataTypes) => {

    const alias = 'User_points';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        userfk: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessfk: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    };

    const config = {
        tableName: "user_points",
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: false,
        deletedAt: false
    }

    const User_points = sequelize.define(alias, cols, config);

    User_points.associate = function (models) {
        User_points.belongsTo(models.User, {
            as: "user",
            foreignKey: "userfk"
        })
    };

    User_points.associate = function (models) {
        User_points.belongsTo(models.Business, {
            as: "business",
            foreignKey: "businessfk"
        })
    };

    return User_points;
}
