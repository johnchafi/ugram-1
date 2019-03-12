const Sequelize = require('sequelize');

const sequelize = new Sequelize('ugram', 'ugram', '2ZuyP9j4u2PDZqxt', {
    host: 'ugram.cxwi9docu0jq.us-east-2.rds.amazonaws.com',
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
