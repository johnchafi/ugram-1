const db = require('./database');

// Setup schema
const userSchema = db.sequelize.define('User', {
        id: {
            type: db.Sequelize.STRING(40),
            primaryKey: true,
            allowNull: false,
            defaultValue: null
        },
        email: {
            type: db.Sequelize.STRING(40),
            unique: true,
            allowNull: false,
            defaultValue: null
        },
        firstName: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false,
            defaultValue: null
        },
        lastName: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false,
            defaultValue: null
        },
        phoneNumber: {
            type: db.Sequelize.INTEGER(11),
            unique: false,
            allowNull: false,
            defaultValue: null
        },
        pictureUrl: {
            type: db.Sequelize.STRING,
            unique: false,
            allowNull: false,
            defaultValue: "https://i.stack.imgur.com/l60Hf.png"
        },
        registrationDate: {
            type: db.Sequelize.DATE,
            unique: false,
            allowNull: false,
            defaultValue: Date.now()
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = userSchema;