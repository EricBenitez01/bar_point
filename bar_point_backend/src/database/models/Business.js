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
            type: dataTypes.STRING(16),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(255),
            defaultValue: null
        },
        password: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
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
    }

    return Business
};