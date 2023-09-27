module.exports = (sequelize, dataTypes) => {
    let alias = 'Benefit';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        businessFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        benefitname: {
            type: dataTypes.STRING(45),
            defaultValue: null
        },
        img: {
            type: dataTypes.STRING(45),
            defaultValue: null
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        points_req: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        tableName: "benefit",
        timestamps: false
    }
    const Benefit = sequelize.define(alias, cols, config);

    Benefit.associate = function (models) {
        Benefit.belongsTo(models.Business, {
            as: "business",
            foreignKey: "businessFK"
        })
    };

    Benefit.associate = function (models) {
        Benefit.hasMany(models.Transaction_type, {
            as: "transaction_types",
            foreignKey: "benefitFK"
        })
    };

    return Benefit
};