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
        userFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        businessFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    };

    const config = {
        tableName: "user_points",
        timestamps: false
    }

    const User_points = sequelize.define(alias, cols, config);

    User_points.associate = function (models) {
        User_points.belongsTo(models.User, {
            as: "user",
            foreignKey: "userFK"
        })
    };

    User_points.associate = function (models) {
        User_points.belongsTo(models.Business, {
            as: "business",
            foreignKey: "businessFK"
        })
    };

    return User_points;
}
