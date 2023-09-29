module.exports = (sequelize, dataTypes) => {
    let alias = 'Business';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(500),
            defaultValue: null
        },
        password: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rolFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "business",
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: false,
        deletedAt: false
    }
    const Business = sequelize.define(alias, cols, config);

    Business.associate = function (models) {
        Business.hasMany(models.Benefit, {
            as: "benefits",
            foreignKey: "businessFK"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.Purchase, {
            as: "purchases",
            foreignKey: "businessFK"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.User_points, {
            as: "user_points",
            foreignKey: "businessFK"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.Transaction, {
            as: "transactions",
            foreignKey: "businessFK"
        })
    };

    Business.associate = function (models) {
        Business.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rolFK"
        })
    };


    return Business
};