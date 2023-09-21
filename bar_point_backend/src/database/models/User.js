module.exports = (sequelize, dataTypes) => {

    const alias = 'User';
    const cols = {
        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true,
        },
        name : {
            type : dataTypes.STRING(500),
            allowNull : false,
        },
        surname : {
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
        token: {
            type: dataTypes.STRING(500), 
            allowNull: true, 
        },
    };

    const config = {
        tableName : "users",
        timestamps : false
    }

    const User = sequelize.define(alias,cols,config);

    return User;
}
