module.exports = (sequelize, dataTypes) => {

    const alias = 'User';
    const cols = {
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
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        gender: {
            type: dataTypes.STRING(16),
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false
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

    const config = {
        tableName: "user",
        timestamps: true,
        createdAt: 'create_time',
        updatedAt: false,
        deletedAt: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rolFK"
        });
    
        User.hasMany(models.User_points, {
            as: "user_points",
            foreignKey: "userFK"
        });
    
        User.hasMany(models.Transaction, {
            as: "transactions",
            foreignKey: "userFK"
        });
    };

    return User;
}
