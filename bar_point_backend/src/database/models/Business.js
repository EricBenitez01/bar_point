module.exports = (sequelize, dataTypes) => {
    let alias = 'Business';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {  // Cambiando el nombre de la columna
            type: dataTypes.STRING(500),
            allowNull: false
        },
        lastname: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        cuit: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        adress: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        businessname: {
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
        rolfk: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        menu: {
            type: dataTypes.STRING(500),
            defaultValue: null
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
            foreignKey: "businessfk"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.Purchase, {
            as: "purchases",
            foreignKey: "businessfk"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.User_points, {
            as: "user_points",
            foreignKey: "businessfk"
        })
    };

    Business.associate = function (models) {
        Business.hasMany(models.Transaction, {
            as: "transactions",
            foreignKey: "businessfk"
        })
    };

    Business.associate = function (models) {
        Business.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rolfk"
        })
    };


    return Business
};