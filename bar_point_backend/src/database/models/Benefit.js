module.exports = (sequelize, dataTypes) => {
    let alias = 'Benefit';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        businessfk : {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        benefitname: {
            type: dataTypes.STRING(500),
            defaultValue: null
        },
        img: {
            type: dataTypes.STRING(500),
            defaultValue: null
        },
        discount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        points_req: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
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
            foreignKey: "businessfk"
        });
    
        Benefit.hasMany(models.Transaction_type, {
            as: "transaction_types",
            foreignKey: "benefitfk"
        });
    };    

    return Benefit
};