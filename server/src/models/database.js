const Sequelize = require('sequelize');

const sequelize = new Sequelize('dbbase', 'user', 'password', {
    host: 'URL',
    dialect: 'mysql',
    operatorsAliases: false,
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {
    sequelize: sequelize,
    Sequelize: Sequelize
};

module.exports = db;
