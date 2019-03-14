const db = require('./database');
const User = require('./user');
const Picture = require('./picture');

// Setup schema
const mentionSchema = db.sequelize.define('mention', {
        id: {
            type: db.Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            defaultValue: null,
            autoIncrement: true,
            field: 'id'
        },
        userId: {
            type: db.Sequelize.STRING(256),
            allowNull: false,
            defaultValue: null,
            field: 'user_id'
/*            references: {
                model: User,
                key: 'id'
            }*/
        },
        pictureId: {
            type: db.Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: null,
            field: 'picture_id',
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