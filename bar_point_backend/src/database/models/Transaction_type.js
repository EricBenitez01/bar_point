module.exports = (sequelize, dataTypes) => {

    const alias = 'Transaction_type';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        purchaseFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        benefitFK: {
            type: dataTypes.INTEGER,
            allowNull: false
        }

    };

    const config = {
        tableName: "transaction_type",
        timestamps: false
    }

    const Transaction_type = sequelize.define(alias, cols, config);

    Transaction_type.associate = function (models) {
        Transaction_type.belongsTo(models.Purchase, {
            as: "purchase",
            foreignKey: "purchaseFK"
        })
    };

    Transaction_type.associate = function (models) {
        Transaction_type.belongsTo(models.Benefit, {
            as: "benefit",
            foreignKey: "benefitFK"
        })
    };

    Transaction_type.associate = function (models) {
        Transaction_type.hasMany(models.Transaction, {
            as: "transactions",
            foreignKey: "transaction_typeFK"
        })
    };

    return Transaction_type;
}
