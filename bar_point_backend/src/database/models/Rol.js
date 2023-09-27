module.exports = (sequelize, dataTypes) => {

    const alias = 'Rol';
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        rol: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    const config = {
        tableName: "rol",
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = function (models) {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rolFK"
        })
    }

    return Rol;
}