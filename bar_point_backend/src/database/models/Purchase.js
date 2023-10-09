module.exports = (sequelize, dataTypes) => {
    let alias = 'Purchase';
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
        purchase_value: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        points: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        ticket_number: {
            type: dataTypes.INTEGER,
            allowNull: true
        }
    };
    let config = {
        tableName: "purchase",
        timestamps: false
    }
    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = function (models) {
        Purchase.belongsTo(models.Business, {
            as: "business",
            foreignKey: "businessFK"
        })
    };

    Purchase.associate = function (models) {
        Purchase.hasMany(models.Transaction_type, {
            as: "transaction_types",
            foreignKey: "purchaseFK"
        })
    };

    return Purchase
};