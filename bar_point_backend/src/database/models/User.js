module.exports = (sequelize, dataTypes) => {

    const alias = 'User';
    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
        },
        username : {
            type : dataTypes.STRING(500),
            allowNull : false,
        },
        email : {
            type : dataTypes.STRING(500),
            allowNull : false,
        },
        password : {
            type : dataTypes.STRING(500),
            allowNull : false,
        },
        rolFK : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull : false,
        },
    };

    const config = {
        tableName : "user",
        timestamps : false
    }

    const User = sequelize.define(alias,cols,config);

    return User;
}
