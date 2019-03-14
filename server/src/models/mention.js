const db = require('./database');
const User = require('./user');
const Picture = require('./picture');

// Setup schema
const mentionSchema = db.sequelize.define('Mentions', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true
        },
        userId: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
/*            references: {
                model: User,
                key: 'id'
            }*/
        },
        pictureId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            references: {
                model: Picture,
                key: 'id'
            }
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Export Users model
module.exports = mentionSchema;