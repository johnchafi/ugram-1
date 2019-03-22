const db = require('../services/database');

// Setup schema
const userSchema = db.sequelize.define('user', {
        id: {
            type: db.Sequelize.STRING(40),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            field: 'id'
        },
        email: {
            type: db.Sequelize.STRING(40),
            unique: true,
            allowNull: false,
            defaultValue: null,
            field: 'email'
        },
        firstName: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'first_name'
        },
        password: {
            type: db.Sequelize.STRING,
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'password'
        },

        lastName: {
            type: db.Sequelize.STRING(40),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'last_name'
        },
        phoneNumber: {
            type: db.Sequelize.INTEGER(11),
            unique: false,
            allowNull: false,
            defaultValue: null,
            field: 'phone_number'
        },
        pictureUrl: {
            type: db.Sequelize.STRING,
            unique: false,
            allowNull: false,
            defaultValue: "https://i.stack.imgur.com/l60Hf.png",
            field: 'picture_url'
        },
        googleId: {
            type: db.Sequelize.STRING,
            unique: false,
            allowNull: true,
            field: 'googleId'
        },
        registrationDate: {
            type: db.Sequelize.DATE,
            unique: false,
            allowNull: false,
            defaultValue: db.Sequelize.NOW,
            field: 'registration'
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

userSchema.formatToClient = (user) => {
    user.dataValues.registrationDate = new Date(user.dataValues.registrationDate).getTime();
    delete user.dataValues.password;
};

// Export Users model
module.exports = userSchema;
